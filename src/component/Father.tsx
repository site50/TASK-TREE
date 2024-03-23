import { useState, useEffect } from 'react';

function Father() {
    const [fathers, setFathers] = useState([{}]);
    const [father, setFather] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3005/data`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('ERROR');
                }
                return res.json()
            })
            .then((data) => {
                const r = data.map((x: any) => x.data.father)
                const h = r.filter((x: any) => x !== undefined)
                setFathers(h);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const addDaug = (e: any) => {
        const id = fathers.length + 1
        let body = { id: id, father: father }
        if (body.father.length != 0) {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            fetch(`http://localhost:3005/post`, requestOptions)
                .then((res) => res.json())
                .then((results) => {
                    console.log(fathers, 'RESULT', results)
                });
            setFathers([...fathers, body]);
            setFather('')
        }

    }
    const deleteItem = (id: any) => {
        let body = { id: id, father: father }
        fetch(`http://localhost:3005/delete/${id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
            .then((response) => response.json())
            .then(() => {
                setFathers((values) => {
                    return values.filter((item) => item.id !== id);
                });
            });
    }
    const update = (a: any) => {
        setFather(a)
        console.log(father, 'update')
    }
    const sav_update = (n: any) => {
        console.log(n.id, 'SAV update')
    }
    return (
        <div className="box-container" >
            {fathers.map((a, index) =>
                <span key={index} >
                    <div className="childe">  {a.father}</div>
                    <div className="childe">
                        <button onClick={() => deleteItem(a.id)} className="button">delete</button>
                        <button onClick={() => update(a.father)} className="button">update</button>
                    </div>
                </span>)}
            <div className="childe" >
                <input value={father} onChange={e => setFather(e.target.value)} />
                <button className="button " onClick={addDaug}>add</button>
                <button className="button " onClick={() => sav_update(father)}>change</button>
            </div>
        </div >
    )
}

export default Father;

