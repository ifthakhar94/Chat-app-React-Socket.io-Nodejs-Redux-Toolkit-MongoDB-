
// eslint-disable-next-line no-unused-vars
const CommonAvatar = ({userId, name, imageUrl, width, height}) => {
    // console.log("userId",userId)
    return (
        <div className="text-center">
            
            {
                imageUrl ? (
                    <img src={imageUrl} alt={name} width={width} height={height} className="rounded-full display-block center" />
                ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-gray-500">{name?.charAt(0)}</span>
                    </div>
                )
            }
            {
                name && (
                    <h1 className="text-2xl font-bold mt-3"> Hello, {name}</h1>
                )
            }
        </div>
    );
};

export default CommonAvatar;