import { useState, useEffect } from 'react';

function Daughter() {
    const [daughters, setDaughters] = useState([{}]);
    const [daughter, setDaughter] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3005/data`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('ERROR');
                }
                return res.json()
            })
            .then((data) => {
                const r = data.map((x: any) => x.data.daughter)
                const h = r.filter((x: any) => x !== undefined)
                setDaughters(h);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const addDaug = (e: any) => {
        const id = daughters.length + 1
        let body = { id: id, daughter: daughter }
        if (body.daughter.length != 0) {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            fetch(`http://localhost:3005/post`, requestOptions)
                .then((res) => res.json())
                .then((results) => {
                    console.log(daughters, 'RESULT', results)
                });
            setDaughters([...daughters, body]);
            setDaughter('')
        }

    }
    const deleteItem = (id: any, daughter: any) => {
        let body = { id: id, daughter: daughter }
        fetch(`http://localhost:3005/delete/${id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
            .then((response) => response.json())
            .then(() => {
                setDaughters((values) => {
                    return values.filter((item) => item.id !== id);
                });
            });
    }
    const update = (a: any) => {
        setDaughter(a)
        console.log(daughter, 'update')
    }
    const sav_update = (n: any) => {
        console.log(n.id, 'SAV update')
    }
    return (
        <div className="box-container" >
            {daughters.map((a, index) =>
                <span key={index} >
                    <div className="childe">  {a.daughter}</div>
                    <div className="childe">
                        <button onClick={() => deleteItem(a.id, a.daughter)} className="button">delete</button>
                        <button onClick={() => update(a.daughter)} className="button">update</button>
                    </div>
                </span>)}
            <div className="childe" >
                <input value={daughter} onChange={e => setDaughter(e.target.value)} />
                <button className="button " onClick={addDaug}>add</button>
                <button className="button " onClick={() => sav_update(daughter)}>change</button>
            </div>
          </div >
    )
}

export default Daughter;