

export default function Loading() {
    const loadingStyle="md:text-3xl text-xl font-bold text-purple-900"
    return (
        <div className="h-full text-center grid content-center">
            <p className={loadingStyle}>Loading...</p>
        </div>
    )
}