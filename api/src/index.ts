import app from './app'
import  './database/database'


app.listen(app.get('SERVER_PORT'), ()=>{
    console.log("server on port:",app.get('SERVER_PORT'));
});