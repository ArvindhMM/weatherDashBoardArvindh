import './index.css'

const TopButtons = ({setQuery}) => {
    const cities = [
        {
            id:1,
            name:'Delhi'
        },
        {
            id:2,
            name:'London'
        },{
            id:3,
            name:'Tokyo'
        },
        {
            id:4,
            name:'Sydney'
        },
        {
            id:5,
            name:'Toronto'
        }
    ]

    return (
        <div className="topbuttons">
            {cities.map(city => (
                <button key = {city.id} className="button" onClick = {() => setQuery({q:city.name})}>
                    {city.name}
                </button>
            ))}
        </div>
    )
}

export default TopButtons