export default function Index({ posts }) {
    return (
        <div>
            <h1>My Super Blog</h1>
            <hr />
            {posts && posts.map((item) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                </div>
            ))}
        </div>
    )
}