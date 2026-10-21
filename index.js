//Require Express/Supabase
const express = require('express'); 
const supa = require('@supabase/supabase-js'); 

//Create app/supabase objects
const app = express(); 
const supaUrl = 'https://seqmjkphpowmaitwgclz.supabase.co'; 
const supaAnonKey = 'sb_publishable_1pYQPb3ldQXTjclR-iLtbw_D3zahwlc'; 
const supabase = supa.createClient(supaUrl, supaAnonKey);


//Returns all the eras
app.get('/api/eras', async (req, res) => { 
    const {data, error} = await supabase 
    .from('eras') 
    .select(); 
    res.send(data); 
}); 


//Returns all the galleries
app.get('/api/galleries', async (req, res) => { 
    const {data, error} = await supabase 
    .from('galleries') 
    .select()
    res.send(data); 
}); 


//Returns just the specified gallery 
app.get('/api/galleries/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('galleries') 
    .select()    
    .eq('galleryId',req.params.id) 
    res.send(data); 
});


//Returns the galleries whose galleryCountry begins with the provided substring
app.get('/api/galleries/country/:substring', async (req, res) => { 
    const search = req.params.substring.toLowerCase();
    const {data, error} = await supabase 
    .from('galleries') 
    .select()    
    .ilike('galleryCountry', `${search}%`)
    res.send(data); 
});


//Returns all the artists
app.get('/api/artists', async (req, res) => { 
    const {data, error} = await supabase 
    .from('artists') 
    .select();
    res.send(data); 
}); 


//Returns just the specified artist 
app.get('/api/artists/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('artists') 
    .select()    
    .eq('artistId',req.params.id); 
    res.send(data); 
});


//Returns the artists whose last name begins with the provided substring
app.get('/api/artists/search/:substring', async (req, res) => { 
    const search = req.params.substring.toLowerCase();
    const {data, error} = await supabase 
    .from('artists') 
    .select()    
    .ilike('lastName', `${search}%`);
    res.send(data); 
});


//Returns the artists whose nationality begins with the provided substring
app.get('/api/artists/country/:substring', async (req, res) => { 
    const search = req.params.substring.toLowerCase();
    const {data, error} = await supabase 
    .from('artists') 
    .select()    
    .ilike('nationality', `${search}%`)
    res.send(data); 
});


//Returns all the genres
app.get('/api/genres', async (req, res) => { 
    const {data, error} = await supabase 
    .from('genres') 
    .select(' genreId, genreName, eras (eraId, eraName, eraYears), description, wikiLink' );
    res.send(data); 
}); 


//Returns just the specified genre
app.get('/api/genres/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('genres') 
    .select(' genreId, genreName, eras (eraId, eraName, eraYears), description, wikiLink' ) 
    .eq('genreId',req.params.id);
    res.send(data); 
});


//Returns the genres used in a given painting /api/genres/painting/:id
app.get('/api/genres/painting/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('paintinggenres') 
    .select('genres(*)' ) 
    .eq('paintingId',req.params.id) 
    .order('genres(genreName)', { ascending: true }); 
    res.send(data); 
});


//Returns just the specified painting 
app.get('/api/paintings/single/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('paintings') 
    .select('paintingID, artists (*), galleries(*), imageFileName, title, shapeID, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations') 
    .eq('paintingID',req.params.id);
    res.send(data); 
});


//Returns limited number of paintings sorted (lowest to highest) by either title or yearOfWork /api/paintings/sort/:title|year/limit/:lim



//Skips to a row then returns a limited number of sorted painted by title or yearOfWork /api/paintings/sort/:title|year/limit/:lim/skip/:jump



//Returns the paintings whose title contains the provided substring
app.get('/api/paintings/search/:substring', async (req, res) => { 
    const search = req.params.substring.toLowerCase();
    const {data, error} = await supabase 
    .from('paintings') 
    .select('paintingID, artists (*), galleries(*), imageFileName, title, shapeID, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations')     
    .ilike('title', `%${search}%`)
    .order('yearOfWork', { ascending: true }); 
    res.send(data); 
});


//Returns the paintings between two years
app.get('/api/paintings/years/:y1/:y2', async (req, res) => { 
const {data, error} = await supabase 
.from('paintings') 
.select('paintingID, artists (*), galleries(*), imageFileName, title, shapeID, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations')        
.gte('yearOfWork',req.params.y1) 
.lte('yearOfWork', req.params.y2)
.order('yearOfWork', { ascending: true }); 
res.send(data); 
});


//Returns all the paintings in a given gallery
app.get('/api/paintings/galleries/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('paintings') 
    .select('paintingID, artists (*), galleries(*), imageFileName, title, shapeID, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations') 
    .eq('galleryID',req.params.id)
    .order('yearOfWork', { ascending: true }); 
    res.send(data); 
});


//Returns all the paintings by a given artis
app.get('/api/paintings/artists/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('paintings') 
    .select('paintingID, artists (*), galleries(*), imageFileName, title, shapeID, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations') 
    .eq('artistID',req.params.id)
    .order('yearOfWork', { ascending: true }); 
    res.send(data); 
});


//Returns all the paintings for a given genre /api/paintings/genre/:id
// app.get('/api/paintings/genre/:id', async (req, res) => { 
//     const {data, error} = await supabase 
//     .from('paintings') 
//     .select('paintingID, title,  yearOfWork') 
//     .eq('genreID',req.params.id)
//     .order('yearOfWork', { ascending: true }); 
//     res.send(data); 
// });


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
console.log('http://literate-acorn-5p9q75j7v652p7qp-8080.app.github.dev'); 
}); 