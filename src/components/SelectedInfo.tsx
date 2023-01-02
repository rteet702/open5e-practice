const SelectedInfo = ({ selection }: any) => {
    return (
        <div className="pl-3">
            <h2 className="text-5xl">{selection.name}</h2>
            <p className="capitalize">
                {selection.size} {selection.type} {selection.challenge_rating}
            </p>
            <p className="italic capitalize mb-5">{selection.alignment}</p>
            {selection.armor_class && (
                <div className="flex items-center justify-around">
                    <div className="border-2 border-black p-5 h-[90px] w-[75px] text-center text-xl relative">
                        <p>{selection.strength}</p>
                        <p className="absolute bottom-0 left-0 right-0 h-6 text-white text-center bg-black">
                            STR
                        </p>
                    </div>
                    <div className="border-2 border-black p-5 h-[90px] w-[75px] text-center text-xl relative">
                        <p>{selection.dexterity}</p>
                        <p className="absolute bottom-0 left-0 right-0 h-6 text-white text-center bg-black">
                            DEX
                        </p>
                    </div>
                    <div className="border-2 border-black p-5 h-[90px] w-[75px] text-center text-xl relative">
                        <p>{selection.constitution}</p>
                        <p className="absolute bottom-0 left-0 right-0 h-6 text-white text-center bg-black">
                            CON
                        </p>
                    </div>
                    <div className="border-2 border-black p-5 h-[90px] w-[75px] text-center text-xl relative">
                        <p>{selection.intelligence}</p>
                        <p className="absolute bottom-0 left-0 right-0 h-6 text-white text-center bg-black">
                            INT
                        </p>
                    </div>
                    <div className="border-2 border-black p-5 h-[90px] w-[75px] text-center text-xl relative">
                        <p>{selection.wisdom}</p>
                        <p className="absolute bottom-0 left-0 right-0 h-6 text-white text-center bg-black">
                            WIS
                        </p>
                    </div>
                    <div className="border-2 border-black p-5 h-[90px] w-[75px] text-center text-xl relative">
                        <p>{selection.charisma}</p>
                        <p className="absolute bottom-0 left-0 right-0 h-6 text-white text-center bg-black">
                            CHA
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedInfo;
