import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async (): Promise<void> =>{
        const response = await signInWithGooglePopup();
        createUserDocumentFromAuth(response);
    }
    
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In with Google</button>
        </div>
    );
}

export default SignIn;