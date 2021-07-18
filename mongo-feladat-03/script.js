const getSomeMovies = async (num) => {
    const movieList = await db.movies.find()
    const movieCount = await db.movies.find().count()
    for (let i = 0; i < movieCount; i++) {
        if (i > 0 && i % num === 0) print('--page over--');
        print(movieList[i].title, ":", movieList[i].category.toLowerCase(), 'movie');
    }
};

getSomeMovies(3);