import React from 'react'
import {TeamFeature} from '../common/Team_Feature'

import Fadaini from "../../assets/team_img/fadaini.jpg"
import Ajith from "../../assets/team_img/ajith.jpg"
import Wei from "../../assets/team_img/wei.jpg"
import Borys from "../../assets/team_img/borys.png"

function Team() {
    return (
        <div className='p4 my-8'>
            <h2 className='text-2xl sm:text-3xl lg:text-5xl font-bold mx-2.5 my-3 text-center'>Meet Our Team</h2>
            <div className='flex justify-center flex-wrap'>
            <TeamFeature
                    src=""
                    desc="FirstName LastName"
                    text="Role."
                    height="h-[100px] sm:h-[250px]"
                    width="w-[100px] sm:w-[250px]"
                />
        <TeamFeature
                    src=""
                    desc="FirstName LastName"
                    text="Role."
                    height="h-[100px] sm:h-[250px]"
                    width="w-[100px] sm:w-[250px]"
                />
        <TeamFeature
                    src=""
                    desc="FirstName LastName"
                    text="Role."
                    height="h-[100px] sm:h-[250px]"
                    width="w-[100px] sm:w-[250px]"
                />
                       <TeamFeature
                    src=""
                    desc="FirstName LastName"
                    text="Role."
                    height="h-[100px] sm:h-[250px]"
                    width="w-[100px] sm:w-[250px]"
                />
                <TeamFeature
                    src=""
                    desc="FirstName LastName"
                    text="Role."
                    height="h-[100px] sm:h-[250px]"
                    width="w-[100px] sm:w-[250px]"
                />
                <TeamFeature
                    src=""
                    desc="FirstName LastName"
                    text="Role."
                    height="h-[100px] sm:h-[250px]"
                    width="w-[100px] sm:w-[250px]"
                />
                <TeamFeature
                    src=""
                    desc="FirstName LastName"
                    text="Role."
                    height="h-[100px] sm:h-[250px]"
                    width="w-[100px] sm:w-[250px]"
                />
                <TeamFeature
                    src=""
                    desc="FirstName LastName"
                    text="Role."
                    height="h-[100px] sm:h-[250px]"
                    width="w-[100px] sm:w-[250px]"
                />

            </div>
        </div>
    )
}

export default Team
