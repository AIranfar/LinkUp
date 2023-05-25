import './AboutLinkUp.css'

const AboutLinkUp = () => {

    return (
        <>
            <div className='about-app-wrapper'>
                <div className='about-app-container'>
                    <h2 className='about-app-header'>About Linkup</h2>
                    <p className='about-app-description'>
                        LinkUp is a full-stack clone of LinkedIn, designed to provide users with a comprehensive platform for professional networking and career development
                    </p>
                    <div className='languages-used'>
                        Javascript | React | Redux | PostgresSQL | Python | Flask | SQLAlchemy | HTML | CSS
                    </div>
                <p className='about-app-my-info'>
                    Linkup Inc™ 2023<a href="https://www.linkedin.com/in/ashkaun-iranfar-608387220/" target="_blank" rel="noopener noreferrer" className="my-links"><i class="fa-brands fa-linkedin" /></a>
                    <a href="https://github.com/AIranfar" target="_blank" rel="noopener noreferrer" className="my-links"><i class="fa-brands fa-github" /></a>
                </p>
                </div>
            </div>
        </>
    )
}

export default AboutLinkUp;
