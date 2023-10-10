function validation(req, res, next) {
   const validRouteRegex = /\/api\/v\d\/tasks(\/\d+)*$/; // Регулярний вираз для шляхів типу /api/{ціле число}
   
   if (!validRouteRegex.test(req.url)) {
      return res.status(404).json({message: "Invalid route"});
   }

   if (req.params.id) {
      const parsedId = Number(req.params.id);
      if (isNaN(parsedId)) {
         return res.status(400).json({message: "Invalid id parameter"});
      }
      req.params.id = parsedId; 
   }
   if(req.method === "POST" || req.method === "PATCH") {
      const {name} = req.body;
      if (name.length <= 2 ) {
      return res.status(400).json({handleError: "Short input"});
   }
   if (name.length > 30) {
         return res.status(400).json({handleError: "Long input"});

      }
   }
   next();
}


module.exports = validation;