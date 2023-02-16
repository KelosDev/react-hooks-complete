import React, { useState } from 'react';

const HookCounterThree = () => {

    const [name, setName] = useState({ firstName: '', lastName: '' }) // object inside useState

    return (
        <div>
            <form>
                <input
                    type='text'
                    value={name.firstName}
                    onChange={e => setName({ ...name, firstName: e.target.value })}
                />
                <input
                    type='text'
                    value={name.lastName}
                    onChange={e => setName({ ...name, lastName: e.target.value })}
                />
                <h2>Your first name is: {name.firstName}</h2>
                <h2>Your last name is: {name.lastName}</h2>
            </form>

        </div>
    );
};

export default HookCounterThree;