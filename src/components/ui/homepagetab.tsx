import { FC } from "react";

interface HomePageTabProps {
    image: string;
    statCount: number | string;
    sectionName: string;
    link: string;
}

const HomePageTab: FC<HomePageTabProps> = ({ image, statCount, sectionName, link }) => {
    return (
        <div
            className="w-full h-32 rounded-xl border flex  items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => window.location.href = link}
        >
            <div>
            <img src={image} className="h-16 w-16 mr-3" alt={`${sectionName} icon`} />
            </div>
            <div className="flex flex-col">
                <h1 className="text-black font-medium text-2xl">{statCount}</h1>
                <h1 className="text-black font-normal text-lg">{sectionName}</h1>
            </div>
        </div>
    );
};

export default HomePageTab;
