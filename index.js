
//Require ENV
require('dotenv').config();

//Require Express/Supabase
const express = require('express'); 
const supa = require('@supabase/supabase-js'); 


//Create app/supabase objects
const app = express(); 
const supaUrl = process.env.API_BASE_URL;
const supaAnonKey = process.env.API_SECRET_KEY; 
const supabase = supa.createClient(supaUrl, supaAnonKey);



//Returns all the eras
app.get('/api/eras', async (req, res) => { 
    const {data, error} = await supabase 
    .from('eras') 
    .select(); 

    //General error
    if (error) {
     return res.status(500).json({ error: error.message });
    }

    //Send Data
    res.send(data); 
}); 




//Returns all the galleries
app.get('/api/galleries', async (req, res) => { 
    const {data, error} = await supabase 
    .from('galleries') 
    .select()

    //General error
    if (error) {
     return res.status(500).json({ error: error.message });
    }

    //Send Data
    res.send(data); 
}); 




//Returns just the specified gallery
app.get('/api/galleries/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('galleries') 
    .select()    
    .eq('galleryId',req.params.id) 

    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Gallery Not Found' });
    }

    //Send Data
    res.send(data); 
});




//Returns the galleries whose galleryCountry begins with the provided substring
app.get('/api/galleries/country/:substring', async (req, res) => { 
    const search = req.params.substring.toLowerCase();
    const {data, error} = await supabase 
    .from('galleries') 
    .select()    
    .ilike('galleryCountry', `${search}%`)
    
    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No Galleries Found' });
    }

    //Send Data
    res.send(data); 
});




//Returns all the artists
app.get('/api/artists', async (req, res) => { 
    const {data, error} = await supabase 
    .from('artists') 
    .select();

    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //Send Data
    res.send(data); 
}); 




//Returns just the specified artist
app.get('/api/artists/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('artists') 
    .select()    
    .eq('artistId',req.params.id); 
    
    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Artist Not Found' });
    }

    //Send Data
    res.send(data);  
});




//Returns the artists whose last name begins with the provided substring
app.get('/api/artists/search/:substring', async (req, res) => { 
    const search = req.params.substring.toLowerCase();
    const {data, error} = await supabase 
    .from('artists') 
    .select()    
    .ilike('lastName', `${search}%`);
    
    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No Artists Found' });
    }

    //Send Data
    res.send(data); 
});




//Returns the artists whose nationality begins with the provided substring
app.get('/api/artists/country/:substring', async (req, res) => { 
    const search = req.params.substring.toLowerCase();
    const {data, error} = await supabase 
    .from('artists') 
    .select()    
    .ilike('nationality', `${search}%`);

    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No Artists Found' });
    }

    //Send Data
    res.send(data); 
});




//Returns all the genres
app.get('/api/genres', async (req, res) => { 
    const {data, error} = await supabase 
    .from('genres') 
    .select(' genreId, genreName, eras (eraId, eraName, eraYears), description, wikiLink' );

    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //Send Data
    res.send(data); 
}); 




//Returns just the specified genre
app.get('/api/genres/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('genres') 
    .select(' genreId, genreName, eras (eraId, eraName, eraYears), description, wikiLink' ) 
    .eq('genreId',req.params.id);

    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Genre Not Found' });
    }

    //Send Data
    res.send(data); 
});




//Returns the genres used in a given painting
app.get('/api/genres/painting/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('paintinggenres') 
    .select('genres(*)' ) 
    .eq('paintingId',req.params.id) 
    .order('genres(genreName)', { ascending: true }); 

    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Painting Genres Not Found' });
    }

    //Send Data
    res.send(data); 
});




//Returns just the specified painting
app.get('/api/paintings/single/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('paintings') 
    .select('paintingID, artists (*), galleries(*), imageFileName, title, shapeID, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations') 
    .eq('paintingID',req.params.id);

    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Painting Not Found' });
    }

    //Send Data
    res.send(data); 
});




//Returns limited number of paintings sorted (lowest to highest) by either title or yearOfWork ASKED ABOUT REF
app.get('/api/paintings/sort/:method/limit/:lim', async (req, res) => { 
    const sortColumns = { title: 'title', year: 'yearOfWork' };
    const column = sortColumns[req.params.method];

  //Check if method is either title or yearOfWork
  if (!column) {
    return res.status(400).json({
      error: `Method'${req.params.method}' Is Not Valid. Use 'title' Or 'year'.`
    });
  }

  //Check if lim is above 0
  const limit = Number(req.params.lim);
  if (!Number.isInteger(limit) || limit <= 0) {
    return res.status(400).json({
      error: 'Limit Must Be An Integer 0 Or More'
    });
  }

  //Query
  let query = supabase
    .from('paintings')
    .select('*, artists(*), galleries(*)')
    .order(column, { ascending: true });

  //Add limit if greater than 0
  if (limit > 0) {
    query = query.limit(limit);
  }

  //RUN QUERY
  const { data, error } = await query

  //General error
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  //No results
  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'No Paintings Found' });
  }

  res.send(data);
});

//Handles missing limit value
app.get('/api/paintings/sort/:method/limit', (req, res) => {
  return res.status(400).json({error: 'Limit value is required'});
});

//Handles missing method value
app.get('/api/paintings/sort/limit/:lim', (req, res) => {
  return res.status(400).json({error: 'method is required'});
});

//Handles missing method AND limit values
app.get('/api/paintings/sort/limit', (req, res) => {
  return res.status(400).json({error: 'Limit value and method are required'});
});



//Skips to a row then returns a limited number of sorted painted by title or yearOfWork ASKED ABOUT REF
app.get('/api/paintings/sort/:method/limit/:lim/skip/:jump', async (req, res) => { 
    const sortColumns = { title: 'title', year: 'yearOfWork' };
    const column = sortColumns[req.params.method];

  //Check if method is either title or yearOfWork
  if (!column) {
    return res.status(400).json({
      error: `Method'${req.params.method}' is not valid. Use 'title' or 'year'.`
    });
  }

  //Check if lim is above 0
  const limit = Number(req.params.lim);
  if (!Number.isInteger(limit) || limit < 0) {
    return res.status(400).json({
      error: 'Limit must be 0 or more'
    });
  }

  //Query
  let query = supabase
    .from('paintings')
    .select('*, artists(*), galleries(*)')
    .order(column, { ascending: true })
    .range(req.params.jump, 9999);

  //Add limit if greater than 0
  if (limit > 0) {
    query = query.limit(limit);
  }

  //RUN QUERY
  const { data, error } = await query

  //General error
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  //No results, Skip Error
  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'Skip amount too high, No Paintings Found' });
  }

  res.send(data);
});

//Handles missing skip value
app.get('/api/paintings/sort/:method/limit/:lim/skip', (req, res) => {
  return res.status(400).json({error: 'Skip value is required'});
});

//Handles missing limit value
app.get('/api/paintings/sort/:method/limit/skip/:jump', (req, res) => {
  return res.status(400).json({error: 'Limit value is required'});
});

//Handles missing method value
app.get('/api/paintings/sort/limit/:lim/skip/:jump', (req, res) => {
  return res.status(400).json({error: 'Method value is required'});
});

//Handles missing method, limit and skip values
app.get('/api/paintings/sort/limit/skip', (req, res) => {
  return res.status(400).json({error: 'Method, limit and skip values are required'});
});




//Returns the paintings whose title contains the provided substring
app.get('/api/paintings/search/:substring', async (req, res) => { 
    const search = req.params.substring.toLowerCase();
    const {data, error} = await supabase 
    .from('paintings') 
    .select('paintingID, artists (*), galleries(*), imageFileName, title, shapeID, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations')     
    .ilike('title', `%${search}%`)
    .order('yearOfWork', { ascending: true }); 
    
    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No Paintings Found' });
    }

    //Send Data
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
    
    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (req.params.y1 > req.params.y2) {
      return res.status(404).json({ error: 'Invalid Year Range, End Year Cannot Be Earlier Than Start Year' });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No Artists Found' });
    }

    //Send Data
    res.send(data); 
});




//Returns all the paintings in a given gallery
app.get('/api/paintings/galleries/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('paintings') 
    .select('paintingID, artists (*), galleries(*), imageFileName, title, shapeID, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations') 
    .eq('galleryID',req.params.id)
    .order('yearOfWork', { ascending: true }); 
    
    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No Paintings In The Given Gallery Found' });
    }

    //Send Data
    res.send(data);
});




//Returns all the paintings by a given artist 
app.get('/api/paintings/artist/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('paintings') 
    .select('paintingID, artists (*), galleries(*), imageFileName, title, shapeID, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations') 
    .eq('artistID',req.params.id)
    .order('yearOfWork', { ascending: true }); 
    
    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No Paintings From The Given Artist Found' });
    }

    //Send Data
    res.send(data); 
});




//Returns all paintings for a given genre
app.get('/api/paintings/genre/:id', async (req, res) => { 
    const {data, error} = await supabase 
    .from('paintinggenres') 
    .select('paintings (paintingID, title,  yearOfWork), genres (genreName)') 
    .eq('genreId',req.params.id)
    .order('paintings (yearOfWork)', { ascending: true }); 
    
    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No Paintings Of The Given Genre Found' });
    }

    //Send Data
    res.send(data); 
});




//Returns all paintings for a given era 
app.get('/api/paintings/era/:id', async (req, res) => {
    const {data, error} = await supabase 
    .from('paintinggenres') 
    .select('paintings (paintingID, title,  yearOfWork), genres!inner (genreName)') 
    .eq('genres.eraID',req.params.id)
    .order('paintings (yearOfWork)', { ascending: true }); 
    
    //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No Paintings Of The Given Era Found' });
    }

    //Send Data
    res.send(data); 
});




//Returns genre name and number of paintings for each genre, sorted by the number of paintings
app.get('/api/counts/genres', async (req, res) => {
  const { data, error } = await supabase
    .from('genres')
    .select('genreName, paintinggenres(count)');

  const result = data
    .map(list => ({
      genreName: list.genreName,
      paintingCount: list.paintinggenres[0].count
    }))
    .sort((a, b) => a.paintingCount - b.paintingCount);

  //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //Send Data
    res.send(data);
});




//Returns artist name and number of paintings for each artist, sorted by the number of paintings
app.get('/api/counts/artists', async (req, res) => {
  const { data, error } = await supabase
    .from('artists')
    .select('firstName, lastName, paintings(count)');

  const result = data
    .map(list => ({
      artistName: `${list.firstName} ${list.lastName}`,
      paintingCount: list.paintings[0].count
    }))
    .sort((a, b) => b.paintingCount - a.paintingCount);

  //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //Send Data
    res.send(data);
});




//Returns genre name and number of paintings for each genre, sorted by the num of paintings for genres with over given number
app.get('/api/counts/topgenres/:minimum', async (req, res) => {
  const { data, error } = await supabase
    .from('genres')
    .select('genreName, paintinggenres(count)');

  const output = data
    .map(list => ({
      genreName: list.genreName,
      paintingCount: list.paintinggenres[0].count
    }))
    .filter(item => item.paintingCount > req.params.minimum)
    .sort((a, b) => b.paintingCount - a.paintingCount);

  //General error
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    //No results
    if (!output || output.length === 0) {
      return res.status(404).json({ error: 'No Genres Found, Minimum May Be Set Too High' });
    }

    //Send Data
    res.send(output);
});


//LISTEN ON RENDERS PORT OR 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { 
console.log('listening on port 8080'); 
console.log('http://literate-acorn-5p9q75j7v652p7qp-8080.app.github.dev'); 
}); 