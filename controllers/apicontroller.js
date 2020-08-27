const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const pool = new pg.Client({connectionString: process.env.DATABASE_URL});

module.exports = (app) => {
    app.get('/info/get', (req, res)=> {
        pool.connect(async(error, client, done)=> {
           if(error) {
             return console.error('could not connect to postgres', error);
           }
           let resp =await client.query('SELECT * From companies');
           res.send(resp.rows);
             
           }); 
           
         });
       
         
       app.post('/info/add', (req, res)=> {
         
         pool.connect(async(error, client)=> {
           if(error) {
             return console.error('could not connect to postgres', error);
           }
           await client.query(`INSERT INTO companies(name,year_established,mission,ceo,location) VALUES ('${req.body.name}', ${req.body.year}, '${req.body.mission}', '${req.body.ceo}', '${req.body.location}')`);
        
           res.redirect('/info/get');
           }); 
         });
       
         app.post('/info/delete', (req, res)=> {
            
           pool.connect(async(error, client)=> {
             if(error) {
               return console.error('could not connect to postgres', error);
             }
             await client.query(`DELETE FROM companies WHERE id = ${req.body.delete}`);
             
             res.redirect('/info/get');
           
           }); 
           
           });
           
           app.post('/info/update', (req, res)=> {
         
             pool.connect(async(error, client)=> {
               if(error) {
                 return console.error('could not connect to postgres', error);
               }
               await client.query(`UPDATE companies SET 
               name = '${req.body.newname}', year_established = ${req.body.newyear}, mission = '${req.body.newmission}', ceo = '${req.body.newceo}', location = '${req.body.newlocation}' 
               WHERE name = '${req.body.oldname}'`);
               
               res.redirect('/info/get');
               
               }); 
             });


}