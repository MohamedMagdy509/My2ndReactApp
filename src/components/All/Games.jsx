import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GamesDataContext } from '../../GamesData';
import styles from './Games.module.scss'

export default function Games() {
    const [showItems, setShowItems] = useState(20);
    let increaseShow=()=>{
        let x = showItems;
        x+=20;
        setShowItems(x);
    }
    let params=useParams();

    let { gamesData, getGamesData } = useContext(GamesDataContext);

    useEffect(() => {
        getGamesData(params.type,params.of);
    },[])

    return (
        <div className="container my-2 overflow-auto">
            <div className="row gy-4 mt-4">
                {gamesData.slice(0,showItems).map((gameData,index)=>
                    <div key={index} className="col-md-3">
                    <div className='myLink bg-dark overflow-hidden rounded-3'>
                        <Link className='text-decoration-none' to={`/details/id/${gameData.id}`}>
                            <img src={gameData.thumbnail} alt="" className='w-100' />
                            <div className="container px-3 pt-3 d-flex justify-content-between align-items-center">
                                <h5 className={styles.mainTextColor}>{gameData.title.length>16?gameData.title.slice(0,13)+"...":gameData.title}</h5> {/*if string > 5 ? slice and put ... : put all*/}
                                <h6 className='btn btn-primary p-1'>FREE</h6>
                            </div>
                            <div className="container my-0 text-muted px-3">
                                <p>{gameData.short_description.length > 30?gameData.short_description.slice(0,25)+"...":gameData.short_description}</p>
                            </div>
                            <div className="container d-flex justify-content-between align-items-center text-muted pb-3">
                                <i className="fas fa-plus-square"></i>
                                <div className="">
                                    <span className='my-0 bg-secondary text-black py-0 px-2 fw-semibold rounded-pill smallFont'>{gameData.genre}</span>
                                    <span className='ms-2'>
                                        {
                                        gameData.platform === "PC (Windows)" ?
                                        <i title="Available on Windows" className="fab fa-windows text-muted"></i>
                                        :<i title="Available on Browser" className="fas fa-window-maximize text-muted"></i>
                                        }
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                )}
            </div>
            <div className="w-100 text-center mt-2 mb-5">
                    {showItems<gamesData.length?<button className='btn btn-primary mt-4 w-25 mx-auto' onClick={increaseShow}>Show more</button>:""}
                </div>
        </div>
    )
}
