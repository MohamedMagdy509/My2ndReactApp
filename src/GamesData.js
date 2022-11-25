import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const GamesDataContext = createContext([]);

export function GamesDataContextProvider(props) {
    let [gamesData, setGamesData] = useState([]);
    let [gameDetails, setGameDetails] = useState({});

    let myHeader = {
        headers: {
            'X-RapidAPI-Key':
                'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        },
        params: {}
    }

    let getGamesData = async (type,of) => {
        myHeader.params={};
        if(type !== "all"){
            myHeader.params[type]= of;
        }
        // let { data } = await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/game" + (type==="id"?"":"s"),myHeader);
        //     gameDetails=data;
        // type==="id"?setGameDetails(data):setGamesData(data);
        
        if(type==="id"){
            setGameDetails({})//important for checking
            let { data } = await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/game" ,myHeader);
            console.log(data,"from data");
            setGameDetails(data);

        }
        else{
            // setGamesData([]);
            let { data } = await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/games",myHeader);
            setGamesData(data);
        }
        
    }
    useEffect(() => {
        setGameDetails(gameDetails);
    }, [gameDetails])
    
    

    

    return <GamesDataContext.Provider value={{ gamesData, getGamesData,gameDetails}}>
        {props.children}
    </GamesDataContext.Provider>

}
