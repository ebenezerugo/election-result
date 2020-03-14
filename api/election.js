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
        db.pollingUnit.findOne({where:{uniqueid:req.params.id}})
            .then(async result=> {
                const announcedPuResult = await db.AnnouncedPuResult.findAll({
                    where:{polling_unit_uniqueid:req.params.id}
                  });
                  return {result, announcedPuResult};
            })
            .then( (result) => res.json(result))
            .catch(error=>res.status(500).json({message:"Error occurred"}))
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