import '../styles/loading.css'

const Loading = () => {
    return (
        <div className="lds-default">
            {/* {''.repeat(12).split('').map((el, i) => <div key={i+Date.now()}></div>)} */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loading