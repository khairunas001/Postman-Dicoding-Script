// Pastikan response memiliki status code 200
pm.test('response status code should have 200 value',() => {
    pm.response.to.have.status(200);
});

// Pastikan header response Content-Type memiliki nilai application/json
pm.test('response Content-Type header should have application/json value', () =>{
    pm.expect(pm.response.headers.get('Content-Type')).to.equals('application/json; charset=utf-8');
});

// Pastikan body response adalah object
pm.test('response body should be an object', () => {
    const responseJson = pm.response.json();
    pm.expect(responseJson).to.be.an('object');
});

// Pastikan body response memiliki properti dan nilai yang sesuai.
pm.test('response body should have the correct property and value', () => {
    const responseJson = pm.response.json();

    pm.expect(responseJson).to.have.ownProperty('status');
    pm.expect(responseJson.status).to.equals('success');
    pm.expect(responseJson).to.have.ownProperty('message');
    pm.expect(responseJson.message).to.equals('Catatan berhasil diperbarui');
});

// Ketika mengakses catatan yang diperbaharu

pm.test('when request the updated note', () => {
    const noteId = pm.environment.get('noteId');
    pm.sendRequest(`http://localhost:5000/notes/${noteId}`, (error, response) => {
        
        // pastikan catatan yang diperbarui memiliki nilai terbaru.
        if(!error){
             pm.test('then the updated note should contain the latest data', () => {
                const responseJson = response.json();
                const {data: { note } } =  responseJson;

                const expectedTitle = 'だいすきだよ';
                const expectedTags = ['へんたいさん', 'きもい'];
                const expectedBody = 'インドネシアご　は　すごい　ですね';

                pm.expect(note.title).to.equals(expectedTitle);
                pm.expect(note.tags).to.eql(expectedTags);
                pm.expect(note.body).to.equals(expectedBody);
            });
        }

    });
});

