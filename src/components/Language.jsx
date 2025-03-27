function Language(props) {
    const styles = {
        
backgroundColor: props.backgroundColor,
color: props.color
    }
    return ( 
        <>
            <button 
            style={styles}
            className="language-btn"

            >{props.name}</button>
        </>
     );
}

export default Language;