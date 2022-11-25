import React, { useContext, useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';
import {  useParams } from 'react-router-dom'
import { GamesDataContext } from '../../GamesData'



export default function Details() {
    let params = useParams();

    let { gameDetails, getGamesData } = useContext(GamesDataContext);


    useEffect(() => {
        getGamesData(params.type, params.of);
    }, [])
    
    useEffect(() => {
        console.log(gameDetails.screenshots);
    }, [gameDetails])





    return (

        <div className="container py-4">
            {gameDetails.screenshots !== undefined?
            <div className="row">
            <div className="col-md-4">
                <img src={gameDetails.thumbnail} alt="" className='w-100 rounded-2' />
                <div className="container-fluid mt-2">
                    <div className="row">
                        <div className="col-3 ps-0">
                            <a href={gameDetails.game_url} className='btn btn-dark bg-secondary w-100 px-0'>FREE</a>
                        </div>
                        <div className="col-9 px-0">
                            <a href={gameDetails.freetogame_profile_url} className='btn btn-primary w-100'>PLAY NOW <i className="fas fa-sign-out-alt"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <h2 className='h1 mb-3'>{gameDetails.title}</h2>
                <h5>About {gameDetails.title}</h5>
                <p>{gameDetails.description}</p>
                <h5>Minimum System Requirements</h5>
                <ul className='list-unstyled'>
                {gameDetails.platform === "Windows" ?<li><span className='fw-bold'>graphics : </span>{gameDetails.minimum_system_requirements !== undefined ? gameDetails.minimum_system_requirements.graphics:""}</li>:""}
                {gameDetails.platform === "Windows" ? <li><span className='fw-bold'>memory : </span>{gameDetails.minimum_system_requirements !== undefined ? gameDetails.minimum_system_requirements.memory:""}</li>:""}
                        {gameDetails.platform === "Windows" ?<li><span className='fw-bold'>os : </span>{gameDetails.minimum_system_requirements !== undefined ? gameDetails.minimum_system_requirements.os :""}</li>:""}
                        {gameDetails.platform === "Windows" ?<li><span className='fw-bold'>processor : </span>{gameDetails.minimum_system_requirements !== undefined ? gameDetails.minimum_system_requirements.processor :""}</li>:""}
                        {gameDetails.platform === "Windows" ?<li><span className='fw-bold'>storage : </span>{gameDetails.minimum_system_requirements !== undefined ? gameDetails.minimum_system_requirements.storage :""}</li>:""}
                </ul>

                <h5>{gameDetails.title} Screenshots</h5>
                <div className="container px-0">
                <OwlCarousel className='owl-theme' loop items={1} dots={false} autoplay={true} autoplayTimeout={2000}>
                {gameDetails.screenshots !== undefined ? gameDetails.screenshots.map((screenshot, index) => <div key={index} className='item'>
                                <img src={screenshot.image} alt="" className='w-100' />
                            </div>) : ""}
                    </OwlCarousel>

                </div>



                <h5 className='h2 my-4'>Additional Information</h5>
                <div className="row">
                    <div className="col-6 col-md-4">
                        <p className='m-0 text-muted'>Title</p>
                        <p>{gameDetails.title}</p>
                    </div>
                    <div className="col-6 col-md-4">
                        <p className='m-0 text-muted'>Developer</p>
                        <p>{gameDetails.developer}</p>
                    </div>
                    <div className="col-6 col-md-4">
                        <p className='m-0 text-muted'>Publisher</p>
                        <p>{gameDetails.publisher}</p>
                    </div>
                    <div className="col-6 col-md-4">
                        <p className='m-0 text-muted'>Release Date</p>
                        <p>{gameDetails.release_date}</p>
                    </div>
                    <div className="col-6 col-md-4">
                        <p className='m-0 text-muted'>Genre</p>
                        <p>{gameDetails.genre}</p>
                    </div>
                    <div className="col-6 col-md-4">
                        <p className='m-0 text-muted'>Platform</p>
                        <p>{gameDetails.platform === "Windows" ? <i className="fab fa-windows me-1"></i> : <i className="fas fa-window-maximize text-muted"></i>} {gameDetails.platform}</p>
                    </div>
                </div>
            </div>
        </div>: <h1 className='py-5 my-5'>Loading</h1>}
        </div>
    )
}
