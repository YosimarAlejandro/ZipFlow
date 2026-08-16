interface FreeCounterProps {
    remaining: number;
}

export default function FreeCounter({ remaining }: FreeCounterProps) {

    return (

        <div className="max-w-2xl mx-auto mb-8">

            <div className="
                rounded-xl
                border
                border-blue-200
                bg-blue-50
                px-6
                py-4
                text-center
            ">

                <p className="text-blue-700 font-medium">

                    🎁 Te quedan{" "}

                    <span className="font-bold text-xl">
                        {remaining}
                    </span>

                    {" "}compresiones gratuitas.

                </p>

            </div>

        </div>

    );
}