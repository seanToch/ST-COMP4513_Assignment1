//Require Express/Supabase
const express = require('express'); 
const supa = require('@supabase/supabase-js'); 

//Create app/supabase objects
const app = express(); 
const supaUrl = ''; 
const supaAnonKey = ''; 
const supabase = supa.createClient(supaUrl, supaAnonKey);


//Returns all the eras /api/eras


//Returns all the galleries /api/galleries 


//Returns just the specified gallery /api/galleries/:id


//Returns the galleries whose galleryCountry begins with the provided substring /api/galleries/country/:substring


//Returns all the artists /api/artists


//Returns just the specified artist /api/artists/:id


//Returns the artists whose last name begins with the provided substring /api/artists/search/:substring


//Returns the artists whose nationality begins with the provided substring /api/artists/country/:substring


//Returns all the genres /api/genres


//Returns just the specified genre /api/genres/:id


//Returns the genres used in a given painting /api/genres/painting/:id


//Returns just the specified painting /api/paintings/single/:id


//Returns limited number of paintings sorted (lowest to highest) by either title or yearOfWork /api/paintings/sort/:title|year/limit/:lim


//Skips to a row then returns a limited number of sorted painted by title or yearOfWork /api/paintings/sort/:title|year/limit/:lim/skip/:jump


//Returns the paintings whose title contains the provided substring /api/paintings/search/:substring


//Returns the paintings between two year /api/paintings/years/:y1/:y2


//Returns all the paintings in a given galler /api/paintings/galleries/:id


//Returns all the paintings by a given artis /api/paintings/artist/:id


//Returns all the paintings for a given genre /api/paintings/genre/:id


//Returns all the paintings for a given era /api/paintings/era/:id


//Returns the genre name and the number of paintings for each genre, sorted by the number of paintings /api/counts/genres


//Returns the artist name and the number of paintings for each artist, sorted by the number of paintings /api/counts/artists


//Returns the genre name and the number of paintings for each genre, sorted by the number of paintings for genres with over some number /api/counts/topgenres/:count



app.get('', async (req, res) => { 
const {data, error} = await supabase 
.from('status') 
.select(); 
res.send(data); 
}); 



app.get('/f1/races', async (req, res) => { 
const {data, error} = await supabase 
.from('races') 
.select(` raceId, year, round, name, circuits (name,location,country) `)
.eq('year',2020) 
.order('round', { ascending: false }); 
res.send(data); 
}); 


app.get('/f1/results/:race', async (req, res) => { 
const {data, error} = await supabase 
.from('results') 
.select(` 
raceId, resultId, positionOrder, races (year, name),  
drivers (forename,surname), constructors (name) 
`)    
.eq('raceId',req.params.race) 
.order('positionOrder', { ascending: true }); 
res.send(data); 
});



app.get('/f1/qualifying/:race', async (req, res) => { 
const {data, error} = await supabase 
.from('qualifying') 
.select(` 
qualifyId, position, q1, q2, q3, races (name, year),  
drivers (forename, surname), constructors (name)
`)    
.eq('raceId',req.params.race) 
.order('position', { ascending: true }); 
console.log(data);
res.send(data); 
});



app.get('/f1/races/:y1/:y2', async (req, res) => { 
const {data, error} = await supabase 
.from('races') 
.select(` * `)    
.gte('year',req.params.y1) 
.lte('year', req.params.y2)
.order('raceId', { ascending: true }); 
console.log(data);
res.send(data); 
});


//TYK pt 3
app.get('/f1/drivers/name/:initial/limit/:lim', async (req, res) => { 
    const name = req.params.initial;
const {data, error} = await supabase 
.from('drivers') 
.select(` * `)    
.ilike('surname', `${name}%`)
.order('surname', { ascending: true })
.limit(req.params.lim);
console.log(data);
res.send(data); 
});






app.listen(8080, () => { 
console.log('listening on port 8080'); 
console.log('http://fuzzy-space-cod-qgxq56j57gw347qj-8080.app.github.dev/f1/status'); 
}); 