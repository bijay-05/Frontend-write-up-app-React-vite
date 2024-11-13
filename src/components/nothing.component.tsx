import React from "react"

const NothingToShow: React.FC<{ display: boolean }> = ({ display }: { display: boolean}) => {
    return (
        <>
          {
            display && (
                <div className="flex items-center">
                    <p>
                        No Content to Show
                    </p>
                </div>
            )
          }
        
        </>
    )
}

export default NothingToShow