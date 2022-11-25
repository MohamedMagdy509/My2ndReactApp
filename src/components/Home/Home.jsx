import React, { useContext, useEffect } from 'react'
import styles from './Home.module.scss'
import { Link } from 'react-router-dom'
import { GamesDataContext } from '../../GamesData'

export default function Home() {
    let { gamesData, getGamesData } = useContext(GamesDataContext);

    useEffect(() => {
        getGamesData("sort-by","popularity");
    },[getGamesData])


    return (
        <section>
            <div className={`${styles.topHome} d-flex justify-content-center align-items-center py-2  border border-1 border-dark rounded-3`}>
                <div className="container-fluid text-center py-5">
                    <h2 className='fs-1 mt-2'>Find & track the best <span className='text-primary'>free-to-play</span> games!</h2>
                    <p className='text-muted my-4'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
                    <button className='btn btn-outline-secondary'>Browse Games</button>
                </div>
            </div>
            <div className="container my-5">
                <h3 className='mb-5'><i className="fas fa-robot mr-2"></i>Personalized Recommendations</h3>
                <div className="row">
                    {gamesData.slice(0, 3).map((gameData,index) =>
                        <div key={index} className='col-md-4'>
                            <div className='myLink bg-dark overflow-hidden rounded-3'>
                                <Link className='text-decoration-none' to={`/details/id/${gameData.id}`}>
                                    <img src={gameData.thumbnail} alt="" className='w-100' />
                                    <div className="container p-3 d-flex justify-content-between align-items-center">
                                        <h3 className={styles.mainTextColor}>{gameData.title}</h3>
                                        <h6 className='btn btn-primary p-1'>FREE</h6>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    )
}
