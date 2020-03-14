module.exports = (app, db) => {
    app.get("/test/:name", (req,res) => {
        res.status(200).json({body:req.params.name,ok:"hello"});
    });
    
    app.get( "/polling-units", (req, res) =>
      db.PollingUnit.findAll()
        .map(async(result) => {
            const {ward_id,uniquewardid} = result;
            const ward = await db.Ward.findOne({where:{unique_id:ward_id}});
            const lga = await db.Lga.findOne({where:{uniqueid:uniquewardid}});
            return {result,ward,lga}
        })
        .then(result=>res.status(200).json(result))
        .catch(error=>res.status(500).json({message:"Error occurred"}))
    );
  
    app.get( "/polling-unit-results/:id", (req, res) => {
        db.PollingUnit.findOne({where:{uniqueid:req.params.id}})
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