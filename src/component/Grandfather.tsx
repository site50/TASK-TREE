import { useState, useEffect } from 'react';

function Gandfather() {
    const [gandfathers, setGandfathers] = useState([{}]);
    const [gandfather, setGandfather] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3005/data`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('ERROR');
                }
                return res.json()
            })
            .then((data) => {
                const r = data.map((x: any) => x.data.gandfather)
                const h = r.filter((x: any) => x !== undefined)
                setGandfathers(h);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const addDaug = (e: any) => {
        const id = gandfathers.length + 1
        let body = { id: id, gandfather: gandfather }
        if (body.gandfather.length != 0) {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            fetch(`http://localhost:3005/post`, requestOptions)
                .then((res) => res.json())
                .then((results) => {
                    console.log(gandfathers, 'RESULT', results)
                });
            setGandfathers([...gandfathers, body]);
            setGandfather('')
        }
    }
    const deleteItem = (id: any, gandfather: any) => {
        let body = { id: id, gandfather: gandfather }
        fetch(`http://localhost:3005/delete/${id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
            .then((response) => response.json())
            .then(() => {
                setGandfathers((values) => {
                    return values.filter((item) => item.id !== id);
                });
            });
    }
    const update = (a: any) => {
        setGandfather(a)
        console.log(gandfather, 'update')
    }
    const sav_update = (n: any) => {
        console.log(n.id, 'SAV update')
    }
    return (
        <div className="box-container" >
            {gandfathers.map((a, index) =>
                <span key={index} >
                    <div className="childe">  {a.gandfather}</div>
                    <div className="childe">
                        <button onClick={() => deleteItem(a.id, a.gandfather)} className="button">delete</button>
                        <button onClick={() => update(a.gandfather)} className="button">update</button>
                    </div>
                </span>)}
            <div className="childe" >
                <input value={gandfather} onChange={e => setGandfather(e.target.value)} />
                <button className="button " onClick={addDaug}>add</button>
                <button className="button " onClick={() => sav_update(gandfather)}>change</button>
            </div>
        </div >
    )
}

export default Gandfather;

