import { useState, useEffect } from 'react';

function Mother() {
    const [mothers, setMothers] = useState([{}]);
    const [mother, setMother] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3005/data`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('ERROR');
                }
                return res.json()
            })
            .then((data) => {
                const r = data.map((x: any) => x.data.mother)
                const h = r.filter((x: any) => x !== undefined)
                setMothers(h);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const addMother = () => {
        const id = mothers.length + 1
        let body = { id: id, mother: mother }
        if (body.mother.length != 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            fetch(`http://localhost:3005/post`, requestOptions)
                .then((res) => res.json())
                .then((results) => {
                  console.log(mothers, 'RESULT', results)
                });
            setMothers([...mothers, body]);
            setMother('')
        }
    }
    const deleteItem = (id: any) => {
        let body = { id: id, mother: mother }
        fetch(`http://localhost:3005/delete/${id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
            .then((response) => response.json())
            .then(() => {
                setMothers((values) => {
                    return values.filter((item) => item.id !== id);
                });
            });
    }

    const update = (a: any) => {
        setMother(a)
        console.log(mother, 'update')
    }
    const sav_update = (n: any) => {
        console.log(n.id, 'SAV update')
    }
    return (
        <div className="box-container" >
            {mothers.map((a, index) =>
                <span key={index} >
                    <div className="childe">  {a.mother}</div>
                    <div className="childe">
                        <button onClick={() => deleteItem(a.id)} className="button">delete</button>
                        <button onClick={() => update(a.mother)} className="button">update</button>
                    </div>
                </span>)}
            <div className="childe" >
                <input value={mother} onChange={e => setMother(e.target.value)} />
                <button className="button " onClick={addMother}>add</button>
                <button className="button " onClick={() => sav_update(mother)}>change</button>
            </div>
        </div >
    )
}
export default Mother