import './Notification.css'

const Notification = ({notification}) => {
    const {type, message, setter} = notification

    if (!(type && message && setter)) return

    setTimeout(() => setter({... notification, message: null}), 3000)

    return (
        <div className={`notification${type ? ` ${type}` : ''}`}>
            <p>{message}</p>
        </div>
    )
}

export default Notification