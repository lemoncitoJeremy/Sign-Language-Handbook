
/* Icon */
import MainPic from "../assets/main_page.png"
import LearnPic from "../assets/learn-pic.png"
import EnhancePic from "../assets/enchance-pic.png"
import PracticePic from "../assets/practice-pic.png"
import Help1 from "../assets/home-help-0.png"
import Help2 from "../assets/home-help-1.png"
import Help3 from "../assets/home-help-2.png"
import Help4 from "../assets/home-help-3.png"
import Jordan from "../assets/jordan.png"
import Manuel from "../assets/rei.png"
import Cariaso from "../assets/ormin.png"
import Jeremy from "../assets/lems.png"
import Rion from "../assets/rion.png"



function HomepageLayout(){
    return(
        <div className="container-fluid">
            <div className="home-content">
                <div className="row">
                    <div className="col home-info">
                        <p className="h1 home-title"> Unlock a World of <br/>Communication:<br/> Welcome</p>
                        <p className="home-desc">Welcome to the Sign Language Handbook - 
                        your gateway to mastering sign language with ease! 
                        Our innovative features, including real-time hand gesture translation 
                        through camera analysis and interactive quizzes, make learning sign 
                        language engaging and fun. Explore our comprehensive content, 
                        from detailed descriptions of hand gestures to customizable language settings. 
                        Whether you're a beginner or an experienced signer, 
                        our website is your ultimate companion on your sign language journey. 
                        Join us today and start communicating in a whole new way!</p>
                    </div>  
                    <div className="col home-info">
                        <img src={MainPic} className="img-fluid"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col home-mid-descs">
                        <img src={LearnPic} className="img-fluid home-learn-img"/>
                        <div className="h1 home-mid-title">
                            Learn
                        </div>
                        <p className="home-mid-desc">
                            Explore comprehensive lessons and tutorials designed to teach you the fundamentals of sign language, from basic vocabulary to sentence structure.
                        </p>
                    </div>  
                    <div className="col home-mid-descs">
                        <img src={PracticePic} className="img-fluid home-practice-img"/>
                        <div className="h1 home-mid-title">
                            Practice
                        </div>
                        <p className="home-mid-desc">
                            Explore comprehensive lessons and tutorials designed to teach you the fundamentals of sign language, from basic vocabulary to sentence structure.
                        </p>
                    </div>
                    <div className="col home-mid-descs">
                        <img src={EnhancePic} className="img-fluid home-enhance-img"/>
                        <div className="h1 home-mid-title">
                            Enhance  
                        </div>
                        <p className="home-mid-desc">
                            Take your sign language proficiency to the next level with advanced resources, tools, and activities aimed at refining your comprehension and communication abilities.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <p className="h1 home-bottom-title"> How Can We Help?</p>
                </div>
                <div className="row">
                    <div className="col">
                        <img src={Help1} className="img-fluid home-help"/>
                    </div>
                    <div className="col">
                        <img src={Help2} className="img-fluid home-help"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <img src={Help3} className="img-fluid home-help"/>
                    </div>
                    <div className="col">
                        <img src={Help4} className="img-fluid home-help"/>
                    </div>
                </div>
                <div className="row home-last">
                    <h2 className="home-last-title">
                        Our Team
                    </h2>
                    <h1 className="home-last-title">
                        Let's empower communication
                    </h1>
                    <p className="home-last-sub-title">
                        One sign at a time  
                    </p>
                </div>
                <div className="row first-row-dev">
                    <div className="col">
                        <div className="card">
                            <img src={Jordan} className="card-img-top" alt="..."/>
                            <div className="card-body dev-car-body">
                                <h5 className="card-title dev-car-text">Dimaunahan, Isiah Jordan</h5>
                                <p className="card-text  dev-car-desc">Full Stack</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <img src={Jeremy} className="card-img-top" alt="..."/>
                            <div className="card-body dev-car-body">
                                <h5 className="card-title dev-car-text">Lemoncito, Jeremy</h5>
                                <p className="card-text  dev-car-desc">Full Stack</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row second-row-dev">
                    <div className="col col-sm-4">
                        <div className="card">
                            <img src={Cariaso} className="card-img-top" alt="..."/>
                            <div className="card-body dev-car-body">
                            <h5 className="card-title dev-car-text">Cariaso, Ormin</h5>
                                <p className="card-text dev-car-desc">Front-End Developer</p>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sm-4">
                        <div className="card">
                            <img src={Rion} className="card-img-top" alt="..."/>
                            <div className="card-body dev-car-body">
                                <h5 className="card-title dev-car-text">Hermoso, Rion Allistair</h5>
                                <p className="card-text dev-car-desc">Front-End Developer</p>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sm-4">
                        <div className="card">
                            <img src={Manuel} className="card-img-top" alt="..."/>
                            <div className="card-body dev-car-body">
                                <h5 className="card-title dev-car-text">Manuel, Jean Rei</h5>
                                <p className="card-text dev-car-desc">Database and Tester</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomepageLayout;