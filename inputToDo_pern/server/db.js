import pg from "pg"

const pool = new pg.Pool (
    {
        user:"postgres",
        password:"sys",
        host:"localhost",
        port:5433,
        database:"perntodo"
    }
)

 export default pool

// this how we structure and export the data base 

/* 
Using export default is fine
 if your project requires it, but module.exports\
  is the default approach in CommonJS modules 
  (used by Node.js). If you're using ES Modules 
  (import/export), export default is appropriate.
   Ensure consistency across your project.
*/
