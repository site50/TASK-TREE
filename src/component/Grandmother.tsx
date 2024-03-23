import { useState, useEffect } from 'react';

function Grandmother() {
    const [grandmothers, setGrandmothers] = useState([{}]);
    const [grandmother, setGrandmother] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3005/data`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('ERROR');
                }
                return res.json()
            })
            .then((data) => {
                //console.log(data);
                const r = data.map((x: any) => x.data.grandmother)
                const h = r.filter((x: any) => x !== undefined)
                // console.log(h);
                setGrandmothers(h);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const addDaug = (e: any) => {
        const id = grandmothers.length + 1
        let body = { id: id, grandmother: grandmother }
        if (body.grandmother.length != 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            fetch(`http://localhost:3005/post`, requestOptions)
                .then((res) => res.json())
                .then((results) => {
                    console.log(grandmothers, 'RESULT', results)

                });
            setGrandmothers([...grandmothers, body]);
            setGrandmother('')
        }
    }
    const deleteItem = (id: any, grandmother: any) => {
        let body = { id: id, grandmother: grandmother }
        // console.log(body,id,grandmother)
        fetch(`http://localhost:3005/delete/${id}`, {
            method: "PUT",
            // headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
            .then((response) => response.json())
            .then(() => {
                setGrandmothers((values) => {
                    return values.filter((item) => item.id !== id);
                });

            });
    }
    const update = (a: any) => {
        setGrandmother(a)
        console.log(grandmother, 'update')
    }
    const sav_update = (n: any) => {
        console.log(n.id, 'SAV update')
    }
    return (
        <div className="box-container" >
        {grandmothers.map((a, index) =>
            <span key={index} >
                <div className="childe">  {a.grandmother}</div>
                <div className="childe">
                    <button onClick={() => deleteItem(a.id, a.grandmother)} className="button">delete</button>
                    <button onClick={() => update(a.grandmother)} className="button">update</button>
                </div>
            </span>)}
        <div className="childe" >
            <input value={grandmother} onChange={e => setGrandmother(e.target.value)} />
            <button className="button " onClick={addDaug}>add</button>
            <button className="button " onClick={() => sav_update(grandmother)}>change</button>
        </div>
    </div >
    )
}

export default Grandmother;

