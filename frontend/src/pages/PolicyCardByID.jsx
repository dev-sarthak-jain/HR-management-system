import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectbackground } from '../redux/Slices/toggleBackgroundSlice';
import ChatPrompt from '../components/ChatBox/ChatPrompt';
import { BsPlusLg } from 'react-icons/bs';
import { PiPencilSimpleLineThin } from "react-icons/pi";
import { AiTwotoneDelete } from "react-icons/ai";
import Thread from '../components/Dashboard/DashCRUD/Thread';
import PolicyCardContent from '../components/Dashboard/DashCRUD/policyCardContent';
import { policyByID, userInfo } from '../redux/Selectors/selectors';
import ChatPopUp from '../components/ChatBox/ChatPopUp';
import { delete_policy_card_API, get_all_policy_card_API } from '../redux/Thunks/policyCardThunk';
import { fetch_all_comments } from '../redux/Thunks/commentsThunk';
import Alert from '../components/common/Alert';
import Loading from '../components/common/loading';
import { createTranscriptID, postUserNeed, createChatTitle } from '../redux/Thunks/chatBotThunk';
import Footer from '../layout/Footer';



const PolicyCardByID = () => {
    let userID;
    const user = useSelector(state => userInfo(state))
    if (user) {
        userID = user.id;
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    const { policyCardID } = useParams(); // Access the parameter value
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [policyPrompt, setPolicyPrompt] = useState("")
    const [popUp, setPopUp] = useState(false)  //PopUp Hidden initially
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    const cardByID = useSelector((state) => policyByID(state, policyCardID));


    const currentMode = useSelector(state => selectbackground(state)) //Background color mode


    const svgTotal = [1, 2, 3];
    const trendsTotal = [1, 2, 3, 4, 5, 6];


    const handleSubmitPolicyPrompt = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const postTranscript = await dispatch(
                createTranscriptID({
                    accessToken: token,
                    user: userID,
                })
            ).unwrap()
            if (postTranscript) {
                setPolicyPrompt("");
            }      // Dispatch the user prompt and the transcript_id from the postTranscript result
            const isFulfilled = await dispatch(
                postUserNeed({
                    accessToken: token,
                    transcriptID: postTranscript.transcript_id,
                    prompt:policyPrompt, //User Input
                    user_id: userID
                })
            ).unwrap()
            // And at the same time create a chat Title
            const chatTitle = await dispatch(
                createChatTitle({
                    transcriptID: postTranscript.transcript_id,
                    prompt: policyPrompt,
                })
            ).unwrap()

            // If user gets a successful response, navigate to the transcript page
            if (isFulfilled && chatTitle) {
                // Then switch user to a url by ID
                setLoading(false)
                const newPageURL = `/chat/${postTranscript.transcript_id}`; // new URL with the parameter
                navigate(newPageURL); //navigate
            }

        } catch (error) {
            if (error) {
        setLoading(false) //Hide loading from user
        setShowError(true) //Show error popup
      }
        }

    }


    const handleDelete = () => {
        setLoading(true)
        try {
            dispatch(
                delete_policy_card_API({
                    accessToken: token,
                    eid: cardByID.eid
                })
            )
            setPopUp(!popUp)
            navigate(`/dashboard`)
        } catch (error) {
            if (error) {
                setLoading(false)
                setShowError(true)
            }
        }

    }


    useEffect(() => {
        if(user){
            dispatch(
                get_all_policy_card_API({
                    accessToken: token,
                })
            )

            dispatch(
                fetch_all_comments({
                    accessToken: token,
                    eid: policyCardID
                })
            )
        }



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    let editAndDeleteButtons;
    if (cardByID && user) {
        if (parseFloat(cardByID.userneed_id) === parseFloat(userID)) {
            editAndDeleteButtons = (<div className='absolute top-2 right-5 space-x-4'>
                <PiPencilSimpleLineThin
                    className="cursor-pointer text-xl sm:text-4xl inline z-10"
                    onClick={() => {
                        navigate(`/dashboard/edit/${policyCardID}`)
                    }}
                />

                <AiTwotoneDelete
                    className="cursor-pointer text-xl sm:text-4xl inline z-10"
                    onClick={() => {
                        setPopUp(!popUp)
                    }}
                />
            </div>)
        }

    }




    return (
        <div className=' bg-nightModeDark text-white '>

            {/* POLICY CARD STARTS*/}
            <div className='flex'>
                <div className='hidden sm:block w-[12%] lg:w-[8%] mr-2.5'>

                    <aside className='sm:px-3 py-4 my-4 lg:my-14 bg-customBlue space-y-3'>

                        {svgTotal.map((element, index) => {
                        return (<div key={index} className='h-[80px]'>
                            {/* <svg className='hidden md:block' height="100" width="70">
                            <circle cx="35" cy="40" r="35" fill="#3C6E71" />
                        </svg> */}

                        {/* PHONE VIEW */}
                        {/* <svg className='md:hidden block' height="45" width="50">
                            <circle cx={40/2} cy={60/3} r="15" fill="#3C6E71" />
                        </svg> */}
                        </div>
                        )}
                        )}
                    </aside>
                </div>


                <section className='w-auto sm:w-[90%] p-4 my-4 sm:m-4 relative'>

                    {cardByID && <PolicyCardContent
                        currentMode={currentMode}
                        category={cardByID.category}
                        content={cardByID.content}
                        policy_makers={cardByID.policy_makers}
                        regional_info={cardByID.regional_info}
                        effective_date={cardByID.effective_date}

                    />}

                    {editAndDeleteButtons}

                </section>
            </div>
            {/* POLICY CARD END */}

            <div className='bg-nightModeDark py-3 px-2 my-5 sm:mx-10 rounded-lg'>
                <div className='flex items-center mx-5 px-2'>
                    <svg className="text-white" width="24" height="24" viewBox="0 0 41 41" fill="none"
                    >
                        <path d="M31.3333 17.0917C31.3333 17.165 31.3333 17.24 31.3283 17.3133C30.8581 16.8956 30.2507 16.6654 29.6217 16.6667C29.3517 16.6667 29.0883 16.7083 28.8333 16.79V9.58334C28.8333 9.25182 28.7016 8.93388 28.4672 8.69946C28.2328 8.46504 27.9149 8.33334 27.5833 8.33334H13.4167C13.0852 8.33334 12.7672 8.46504 12.5328 8.69946C12.2984 8.93388 12.1667 9.25182 12.1667 9.58334V17.0917C12.1667 17.7817 12.7267 18.3417 13.4167 18.3417H27.21L27.1933 18.3833L27.1883 18.4033L26.4383 20.71L26.4217 20.7533C26.4116 20.783 26.4011 20.8124 26.39 20.8417H13.4167C12.4221 20.8417 11.4683 20.4466 10.765 19.7433C10.0618 19.0401 9.66667 18.0862 9.66667 17.0917V9.58334C9.66667 8.58878 10.0618 7.63495 10.765 6.93169C11.4683 6.22843 12.4221 5.83334 13.4167 5.83334H19.25V4.58334C19.2501 4.28103 19.3597 3.98899 19.5586 3.7613C19.7575 3.53362 20.0321 3.38572 20.3317 3.34501L20.5 3.33334C20.8023 3.33341 21.0944 3.44304 21.3221 3.64192C21.5497 3.8408 21.6976 4.11545 21.7383 4.41501L21.75 4.58334L21.7483 5.83334H27.5817C28.5762 5.83334 29.5301 6.22843 30.2333 6.93169C30.9366 7.63495 31.3317 8.58878 31.3317 9.58334L31.3333 17.0917ZM22.2383 23.3933L22.425 23.3333H10.9233C9.92878 23.3333 8.97495 23.7284 8.27169 24.4317C7.56843 25.135 7.17334 26.0888 7.17334 27.0833V28.595C7.17318 29.4951 7.36743 30.3846 7.74282 31.2027C8.11821 32.0208 8.66587 32.7481 9.34834 33.335C11.9533 35.5733 15.685 36.6683 20.5 36.6683C23.96 36.6683 26.8617 36.1033 29.1883 34.955C28.7457 34.8711 28.3329 34.6726 27.991 34.3793C27.6491 34.086 27.3902 33.7081 27.24 33.2833L27.2333 33.2633L27.1833 33.1083C25.3733 33.8117 23.15 34.1683 20.5 34.1683C16.235 34.1683 13.075 33.2417 10.9783 31.4383C10.5689 31.0863 10.2404 30.65 10.0152 30.1593C9.78994 29.6685 9.67334 29.135 9.67334 28.595V27.0833C9.67334 26.7518 9.80504 26.4339 10.0395 26.1995C10.2739 25.965 10.5918 25.8333 10.9233 25.8333H20.5V25.8283C20.4999 25.2957 20.6651 24.7762 20.9729 24.3415C21.2807 23.9068 21.7159 23.5784 22.2183 23.4017L22.2383 23.3933ZM18.8317 12.9167C18.8396 12.6382 18.7915 12.3611 18.6904 12.1015C18.5893 11.842 18.4372 11.6053 18.243 11.4056C18.0488 11.2059 17.8166 11.0471 17.56 10.9387C17.3034 10.8303 17.0277 10.7744 16.7492 10.7744C16.4706 10.7744 16.1949 10.8303 15.9383 10.9387C15.6817 11.0471 15.4495 11.2059 15.2553 11.4056C15.0612 11.6053 14.9091 11.842 14.8079 12.1015C14.7068 12.3611 14.6588 12.6382 14.6667 12.9167C14.682 13.4588 14.9081 13.9736 15.297 14.3516C15.6859 14.7296 16.2068 14.9411 16.7492 14.9411C17.2915 14.9411 17.8125 14.7296 18.2013 14.3516C18.5902 13.9736 18.8163 13.4588 18.8317 12.9167ZM24.2367 10.8333C24.5151 10.8255 24.7923 10.8735 25.0518 10.9746C25.3114 11.0757 25.548 11.2279 25.7478 11.422C25.9475 11.6162 26.1062 11.8484 26.2147 12.105C26.3231 12.3616 26.3789 12.6373 26.3789 12.9158C26.3789 13.1944 26.3231 13.4701 26.2147 13.7267C26.1062 13.9833 25.9475 14.2155 25.7478 14.4097C25.548 14.6038 25.3114 14.756 25.0518 14.8571C24.7923 14.9582 24.5151 15.0062 24.2367 14.9983C23.6946 14.983 23.1798 14.7569 22.8018 14.368C22.4237 13.9791 22.2123 13.4582 22.2123 12.9158C22.2123 12.3735 22.4237 11.8526 22.8018 11.4637C23.1798 11.0748 23.6946 10.8487 24.2367 10.8333ZM27.315 29.02C26.741 28.2779 25.9588 27.7237 25.0683 27.4283L22.7733 26.6817C22.597 26.6189 22.4444 26.5031 22.3365 26.3502C22.2286 26.1973 22.1707 26.0147 22.1707 25.8275C22.1707 25.6403 22.2286 25.4578 22.3365 25.3048C22.4444 25.1519 22.597 25.0361 22.7733 24.9733L25.0683 24.2267C25.7483 23.9922 26.3658 23.6059 26.8741 23.097C27.3823 22.5882 27.768 21.9702 28.0017 21.29L28.0183 21.2333L28.7667 18.9383C28.8291 18.7614 28.9448 18.6083 29.098 18.4999C29.2511 18.3916 29.4341 18.3334 29.6217 18.3334C29.8093 18.3334 29.9922 18.3916 30.1454 18.4999C30.2985 18.6083 30.4143 18.7614 30.4767 18.9383L31.2233 21.2333C31.4557 21.9309 31.8476 22.5647 32.3678 23.0843C32.888 23.6039 33.5222 23.9951 34.22 24.2267L36.5167 24.9733L36.5617 24.985C36.738 25.0478 36.8906 25.1636 36.9985 25.3165C37.1064 25.4694 37.1643 25.652 37.1643 25.8392C37.1643 26.0263 37.1064 26.2089 36.9985 26.3619C36.8906 26.5148 36.738 26.6306 36.5617 26.6933L34.265 27.44C33.5673 27.6718 32.9332 28.0631 32.413 28.5826C31.8929 29.1022 31.5009 29.7359 31.2683 30.4333L30.5233 32.7283C30.4598 32.9052 30.3434 33.0582 30.19 33.1667C30.0756 33.2476 29.9439 33.3009 29.8054 33.3223C29.6669 33.3438 29.5254 33.3329 29.3918 33.2904C29.2582 33.2479 29.1363 33.1751 29.0357 33.0775C28.935 32.98 28.8584 32.8605 28.8117 32.7283L28.065 30.4333C27.8972 29.923 27.6436 29.445 27.315 29.02ZM40.1383 35.355L38.8633 34.9417C38.4756 34.8129 38.1233 34.5955 37.8343 34.3068C37.5452 34.0181 37.3275 33.6659 37.1983 33.2783L36.7833 32.0033C36.7488 31.9049 36.6846 31.8196 36.5995 31.7593C36.5144 31.6989 36.4127 31.6665 36.3083 31.6665C36.204 31.6665 36.1023 31.6989 36.0172 31.7593C35.9321 31.8196 35.8678 31.9049 35.8333 32.0033L35.4183 33.2767C35.2921 33.6617 35.0785 34.0124 34.7943 34.3012C34.5101 34.59 34.163 34.8092 33.78 34.9417L32.5033 35.355C32.4049 35.3895 32.3196 35.4538 32.2593 35.5389C32.1989 35.624 32.1665 35.7257 32.1665 35.83C32.1665 35.9343 32.1989 36.0361 32.2593 36.1212C32.3196 36.2063 32.4049 36.2705 32.5033 36.305L33.78 36.72C34.1682 36.8496 34.5207 37.068 34.8095 37.358C35.0983 37.6479 35.3153 38.0013 35.4433 38.39L35.86 39.6633C35.8953 39.761 35.9598 39.8455 36.0448 39.9052C36.1298 39.9649 36.2311 39.9969 36.335 39.9969C36.4389 39.9969 36.5402 39.9649 36.6252 39.9052C36.7102 39.8455 36.7747 39.761 36.81 39.6633L37.2233 38.39C37.3522 38.0018 37.57 37.6491 37.8594 37.36C38.1488 37.071 38.5017 36.8535 38.89 36.725L40.165 36.3117C40.2635 36.2772 40.3487 36.2129 40.4091 36.1278C40.4694 36.0427 40.5018 35.941 40.5018 35.8367C40.5018 35.7324 40.4694 35.6306 40.4091 35.5455C40.3487 35.4604 40.2635 35.3962 40.165 35.3617L40.1383 35.355Z"
                            fill="currentColor" />
                    </svg>
                    <p className='ml-1 text-white font-nunito text-[16px] not-italic font-medium leading-normal'>
                        OpenPolitica Bot
                    </p>
                </div>
                <ChatPrompt
                    currentMode={currentMode}
                    bgOnDark="bg-nightModeDark"
                    position="static"
                    placeholder="What data would you like to see?"
                    submitPrompt={handleSubmitPolicyPrompt}
                    value={policyPrompt}
                    handleChange={(e) => {
                        setPolicyPrompt(e.target.value)
                    }} />

            </div>

            <div className='flex flex-wrap sm:justify-center w-full'>
                {trendsTotal.map((element, index) => (
                    <div key={index} className='flex justify-center items-center
                    border-2 stretched-dash border-dashed w-[43%] sm:w-1/4 h-32 m-2.5 sm:m-5 border-black'>
                        <BsPlusLg className=' text-greenOnDarkMode font-bold text-5xl' />
                    </div>)

                )}
            </div>

            <Thread />

            <Footer />




            {/* POP UP */}
            {popUp && <ChatPopUp
                objectModel="Policy Card?"
                handleClosePopUp={() => setPopUp(!popUp)}
                handleCancel={() => setPopUp(!popUp)}
                promptTarget="This policy card"
                handleDelete={handleDelete}

            />}

            {loading &&  <Loading width="w-full"/>}
            {showError && <Alert
                isVisible={showError}
                message="Oops! Something went wrong."
                type="error"
            />}
        </div>

    )
}

export default PolicyCardByID
