export default function outputPolicies(error, data) {
    if (error) {
        console.error(':(', error);
        return;
    }
    console.log('data', data);
    const ul = document.getElementsByClassName('policies-list')[0];
    Object.keys(data).forEach(key => {
        const policy = data[key];
        let li = document.createElement('li');
        li.innerHTML = `<strong>${data[key].name || key}</strong> : ${data[key].description}` ;
        ul.appendChild(li);
    });
};
