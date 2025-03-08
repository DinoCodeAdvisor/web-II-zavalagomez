function MyButton({ title, counter, setCounter })
{
    function addToCounter()
    {
        setCounter(counter+1);
    }

    return (
        <button onClick={addToCounter}>{title}</button>
    );
}

window.MyButton = MyButton;