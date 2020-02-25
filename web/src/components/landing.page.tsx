import React from "react";
import logo from '../assets/images/My_DAO_Dashboard_logo_500x500.png';
import screens from '../assets/images/screens_collage2.png';
import illu1 from '../assets/images/item_illu_1.png';
import illu2 from '../assets/images/item_illu_2.png';
import illu3 from '../assets/images/item_illu_3.png';
import moloch from '../assets/images/moloch.png';
import daostack from '../assets/images/DAOstack-logo.jpg';
import aragon from '../assets/images/aragon.png';

import { Link } from "react-router-dom";

export const LandingPage: React.FC = () => {
  return (
    <div className="landingpage">
        <div className="intro">
            <div className="intro_txt">
                <div className="intro_txt_logo">
                    <img src={logo} />
                    <h1>Gear up, get DAO’ing.</h1>
                    <p>In the fast-paced world of decentralized autonomous 
                        organizations, we need a single app to keep up to 
                        speed and tune in to all activity surrounding these 
                        instruments of decentralisation.
                    </p>
                    <Link className="redlink" to="/dashboard">Enter My DAO Dashboard</Link>

                </div>
            </div>
            <div className="intro_img">
                <img src={screens} />
            </div>
        </div>


        <div className="usps_and_btn">
            <div className="usps">
                <div className="usp">
                    <div className="usp_img">
                        <img src={illu1} />
                    </div>
                    <div className="usp_txt">
                        <h2>Participate or watch.</h2>
                        <p>Apart from the DAO’s your participating in, you can also easily add some to your watchlist and observe their activity.</p>
                    </div>
                </div>
                <div className="usp">
                    <div className="usp_img">
                        <img src={illu2} />
                    </div>
                    <div className="usp_txt">
                        <h2>Vote in-app.</h2>
                        <p>See all active and passive proposals for each DAO, and execute the DAO’s most prominent feature, voting, directly in the app. </p>
                    </div>
                </div>
                <div className="usp">
                    <div className="usp_img">
                        <img src={illu3} />
                    </div>
                    <div className="usp_txt">
                        <h2>Take the pulse.</h2>
                        <p>All key-metrics of your all of your DAO’s will be visible in the app, making sure you know what’s going on in each DAO.</p>
                    </div>
                </div>
            </div>
            <button><Link to='/dashboard'>Enter My Dao Dashboard</Link></button>
        </div>

        <div className="components">
            <div className="component left">
                <h2>Dao Scan</h2>
                <p>Data availability for DeFi is low, despite data being open. We index the whole Ethereum blockchain to provide the most fresh structured information about DAOs in real time: organisations, participants, votes*, assets under management*, everything important. It powers MyDAODashboard, and it could also serve your product.</p>
                <div className="component_github_link">
                    <a href="https://github.com/my-dao-dashboard/daoscan">Dao Scan on github</a>
                    <svg viewBox="0 0 100 100">
                        <path className='github_white' d="M50.27,10A41.71,41.71,0,0,0,37.09,91.28c2.09.38,2.85-.91,2.85-2s0-3.62-.06-7.1c-11.6,2.52-14.05-5.59-14.05-5.59-1.89-4.82-4.63-6.1-4.63-6.1-3.78-2.59.29-2.53.29-2.53,4.18.29,6.39,4.29,6.39,4.29,3.72,6.38,9.76,4.54,12.13,3.47a9,9,0,0,1,2.65-5.58c-9.26-1-19-4.63-19-20.61A16.13,16.13,0,0,1,28,38.33c-.43-1-1.86-5.29.41-11,0,0,3.5-1.13,11.46,4.27a39.66,39.66,0,0,1,20.89,0c8-5.4,11.45-4.27,11.45-4.27,2.28,5.74.85,10,.42,11a16.11,16.11,0,0,1,4.28,11.19c0,16-9.75,19.55-19,20.58,1.5,1.29,2.83,3.83,2.83,7.72,0,5.58,0,10.08,0,11.45,0,1.11.75,2.41,2.87,2A41.71,41.71,0,0,0,50.27,10Z"/>
                    </svg>
                </div>
            </div>
            <div className="component right">
                <h2>My Dao Dashboard</h2>
                <p>MyDAODashboard provides a light-weight interface, a single point of interaction between a user and all the DAOs he wants to interact with. A user is able to view all key-metrics for each DAO, as well as vote on active proposals. The app also has the possibility for a user to follow DAOs of which he is not an active member.</p>
                <div className="component_github_link component_github_link_right">
                    <a href="https://github.com/my-dao-dashboard/My-DAO-Dashboard">My Dao Dashboard on github</a>
                    <svg viewBox="0 0 100 100">
                        <path className='github_white' d="M50.27,10A41.71,41.71,0,0,0,37.09,91.28c2.09.38,2.85-.91,2.85-2s0-3.62-.06-7.1c-11.6,2.52-14.05-5.59-14.05-5.59-1.89-4.82-4.63-6.1-4.63-6.1-3.78-2.59.29-2.53.29-2.53,4.18.29,6.39,4.29,6.39,4.29,3.72,6.38,9.76,4.54,12.13,3.47a9,9,0,0,1,2.65-5.58c-9.26-1-19-4.63-19-20.61A16.13,16.13,0,0,1,28,38.33c-.43-1-1.86-5.29.41-11,0,0,3.5-1.13,11.46,4.27a39.66,39.66,0,0,1,20.89,0c8-5.4,11.45-4.27,11.45-4.27,2.28,5.74.85,10,.42,11a16.11,16.11,0,0,1,4.28,11.19c0,16-9.75,19.55-19,20.58,1.5,1.29,2.83,3.83,2.83,7.72,0,5.58,0,10.08,0,11.45,0,1.11.75,2.41,2.87,2A41.71,41.71,0,0,0,50.27,10Z"/>
                    </svg>
                </div>
            </div>

        </div>
        <div className="supportedDAOs_and_txt">
            <p>These DAO-protocols will be supported in the app. Are we missing an important one? <a href="https://github.com/my-dao-dashboard/My-DAO-Dashboard/issues">Let us know!</a></p>
            <div className="supportedDAOs">
                <div className="supportedDAO">
                    <img src={aragon} />
                    <p>Aragon</p>
                </div>
                <div className="supportedDAO">
                    <img src={daostack} />
                    <p>DAOstack</p>
                </div>
                <div className="supportedDAO">
                    <img src={moloch} />
                    <p>MolochDAO</p>
                </div>               
            </div>
        </div>
        <div className="footer">
            <div className="footer_and_txt">
                <div className="logo">
                    <img src={logo} />
                    <h2>My Dao Dashboard</h2>
                </div>
                <p>Originated at EthBerlinZwei, My DAO Dashboard is an open source community, aiming to contribute value to the decentralized world by creating  useful tools for managing DAO’s.</p>
                <a href="https://t.me/mydaodashboard">Wanna join? Reach out!</a>
            </div>
            <div className="sociallinks_and_txt">
                <p>Find us on these platforms:</p>
                <div className="sociallinks">
                <svg viewBox="0 0 100 100">
                        <path className='github_black' d="M50.27,10A41.71,41.71,0,0,0,37.09,91.28c2.09.38,2.85-.91,2.85-2s0-3.62-.06-7.1c-11.6,2.52-14.05-5.59-14.05-5.59-1.89-4.82-4.63-6.1-4.63-6.1-3.78-2.59.29-2.53.29-2.53,4.18.29,6.39,4.29,6.39,4.29,3.72,6.38,9.76,4.54,12.13,3.47a9,9,0,0,1,2.65-5.58c-9.26-1-19-4.63-19-20.61A16.13,16.13,0,0,1,28,38.33c-.43-1-1.86-5.29.41-11,0,0,3.5-1.13,11.46,4.27a39.66,39.66,0,0,1,20.89,0c8-5.4,11.45-4.27,11.45-4.27,2.28,5.74.85,10,.42,11a16.11,16.11,0,0,1,4.28,11.19c0,16-9.75,19.55-19,20.58,1.5,1.29,2.83,3.83,2.83,7.72,0,5.58,0,10.08,0,11.45,0,1.11.75,2.41,2.87,2A41.71,41.71,0,0,0,50.27,10Z"/>
                    </svg>
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><title>social_icons</title><path fill="#2AA3EF" d="M31.7,91.35c36,0,55.61-29.79,55.61-55.61,0-.85,0-1.69-.06-2.53A39.75,39.75,0,0,0,97,23.09a38.78,38.78,0,0,1-11.22,3.08,19.63,19.63,0,0,0,8.59-10.81A39.25,39.25,0,0,1,82,20.1,19.55,19.55,0,0,0,48.15,33.47a19.86,19.86,0,0,0,.5,4.46A55.52,55.52,0,0,1,8.37,17.51,19.55,19.55,0,0,0,14.42,43.6a19.33,19.33,0,0,1-8.85-2.45,2.09,2.09,0,0,0,0,.25A19.55,19.55,0,0,0,21.24,60.56a19.5,19.5,0,0,1-8.82.34A19.56,19.56,0,0,0,30.67,74.47,39.16,39.16,0,0,1,6.4,82.84a39.81,39.81,0,0,1-4.66-.27,55.36,55.36,0,0,0,30,8.78"/></svg>
                    <img src="" />
                </div>
            </div>
        </div>        

    </div>
  );
};
