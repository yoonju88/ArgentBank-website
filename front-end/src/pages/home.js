import React from "react"
import { featureList } from "../content/data/featureList"
import FeatureItem from "../content/FeatureItem";

function Home () {
    return (
        <>
            <div className="hero">
                <section className="hero-content">
                <h2 className="sr-only">Promoted Content</h2>
                <p className="subtitle">No fees.</p>
                <p className="subtitle">No minimum deposit.</p>
                <p className="subtitle">High interest rates.</p>
                <p className="text">Open a savings account with Argent Bank today!</p>
                </section>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                    {featureList.map(item => (
                        <FeatureItem 
                            key={item.id}
                            image={item.image}
                            alt={item.imageAlt}
                            title={item.title}
                            description={item.description}
                        />
                    ))}             
            </section>
        </>
    )
}

export default Home;
