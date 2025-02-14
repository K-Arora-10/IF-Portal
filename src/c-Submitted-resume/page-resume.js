import React from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import ResumeGrid from "./submittedresumes";
import bg1 from "../Photos/bg1.jpg"

// Array of background image URLs for each section
const backgroundImages = [
    bg1,
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80"
];

const PageResume = () => {
    return (
        <div>
            {/* Hero Section */}
            <ReactLenis root>
                <main>
                    <article>
                        {/* Section 1 */}
                        <Section background={backgroundImages[0]}>
                            <h2 className="text-5xl font-bold text-center text-white mt-0 mb-6">
                                Submitted Resumes
                            </h2>
                            <ResumeGrid />
                        </Section>
                    </article>
                </main>
            </ReactLenis>
        </div>
    );
};

// Reusable Section Component to reduce duplication
const Section = ({ background, children }) => (
    <section
        className="relative min-h-screen w-full grid place-content-center bg-fixed"
        style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
        }}
    >
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="relative z-20">
            {children}
        </div>
    </section>
);

export default PageResume;