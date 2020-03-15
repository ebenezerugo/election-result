const {Op} = require('sequelize');

module.exports = (app, db) => {
    app.get("/test/:name", (req,res) => {
        res.status(200).json({body:req.params.name,ok:"hello"});
    });

    app.get( "/polling-units", (req, res) => {
      db.polling_unit.findAll()
        .map(async(result) => {
            const {lga_id,uniquewardid} = result;
            const ward = await db.ward.findOne({where:{uniqueid:uniquewardid}});
            const lga = await db.lga.findOne({where:{lga_id:lga_id}});
            result.dataValues.ward = ward;
            result.dataValues.lga = lga;
            return result;
        })
        .then(result=>res.status(200).json(result))
        .catch(error=>{
            console.log(error);
            res.status(500).json({message:"Error occurred",error})
        });
    });
  
    app.get( "/polling-unit-results/:id", (req, res) => {
        db.polling_unit.findOne({where:{uniqueid:req.params.id}})
            .then(async result=> {
                const announcedPuResult = await db.announced_pu_results.findAll({
                    where:{polling_unit_uniqueid:req.params.id}
                  });
                  result.dataValues.announcedPuResult = announcedPuResult;
                  return result;
            })
            .then( (result) => res.status(200).json(result))
            .catch(error=>res.status(500).json({message:"Error occurred"}))
    });

    app.get("/states", (req,res) => {
        db.states.findAll()
            .then(result=>res.status(200).json(result))
            .catch(error=>res.status(500).json({message:"Error occurred"}));
    });

    app.get("/lga/:state_id", (req,res)=> {
        const {state_id} = req.params;
        db.lga.findAll({where:{state_id}})
            .then(result=>res.status(200).json(result))
            .catch(error=>res.status(500).json({message:"Error occurred"}));
    });

    app.get("/wards/:lga_id", (req,res) => {
        const {lga_id} = req.params;
        db.ward.findAll({where:{lga_id}})
        .map(async(result) => {
            const {lga_id} = result;
            const lga = await db.lga.findOne({where:{lga_id:lga_id}});
            result.dataValues.lga = lga;
            return result;
        })
        .then(result=>res.status(200).json(result))
        .catch(error=>res.status(500).json({message:"Error occurred"}));
    });

    app.get( "/polling-units/:ward_id", (req, res) => {
        const {ward_id} = req.params;
        db.polling_unit.findAll({where:{ward_id}})
          .map(async(result) => {
              const {lga_id,uniquewardid} = result;
              const ward = await db.ward.findOne({where:{uniqueid:uniquewardid}});
              const lga = await db.lga.findOne({where:{lga_id:lga_id}});
              result.dataValues.ward = ward;
              result.dataValues.lga = lga;
              return result;
          })
          .then(result=>res.status(200).json(result))
          .catch(error=>{
              console.log(error);
              res.status(500).json({message:"Error occurred",error})
          });
      });

    app.get("/total-polling-unit/:lga_id", async (req,res) => {
        const {lga_id} = req.params;
        try {

            let lga = await db.lga.findOne({where:{lga_id}});
            // Getting the polling units in a local goverment area.
            let polling_units = await db.polling_unit.findAll({where:{lga_id}});
            let total_polling_units_count = polling_units.length;

            // Aggregating all the polling units id together in to an array
            let polling_unit_uniqueIds = polling_units.map(polling_unit=>{
                return polling_unit.uniqueid;
            });
            console.log(polling_unit_uniqueIds);
            // Use the aggregated polling unit id to get and sum announced polling unit result and group it to parties.
            let parties_score = await db.announced_pu_results.findAll({
                attributes: [
                    'party_abbreviation',
                    [db.sequelize.fn('sum', db.sequelize.col('party_score')), 'total_party_score'],
                ],
                group: ['party_abbreviation'],
                where:{polling_unit_uniqueid:{[Op.or]: polling_unit_uniqueIds}}
            });

            let overall_total = 0;
            for (var i = 0; i < parties_score.length; i++) {
                overall_total = overall_total + parties_score[i].total_party_score;
            }

            res.status(200).json({lga,total_polling_units_count,parties_score,overall_total})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Error occurred",error});
        }
      });

  
    // app.post("/post", (req, res) => 
    //   db.post.create({
    //     title: req.body.title,
    //     content: req.body.content
    //   }).then( (result) => res.json(result) )
    // );
  
    // app.put( "/post/:id", (req, res) =>
    //   db.post.update({
    //     title: req.body.title,
    //     content: req.body.content
    //   },
    //   {
    //     where: {
    //       id: req.params.id
    //     }
    //   }).then( (result) => res.json(result) )
    // );
  
    // app.delete( "/post/:id", (req, res) =>
    //   db.post.destroy({
    //     where: {
    //       id: req.params.id
    //     }
    //   }).then( (result) => res.json(result) )
    // );
  };