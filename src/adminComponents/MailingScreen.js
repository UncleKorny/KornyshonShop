import axios from 'axios';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function MailingScreen() {
    const [editorHtml, setEditorHtml] = useState('');

    const handleEditorChange = (html) => {
        setEditorHtml(html);
    };
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image',
    ];
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
    });
    const handlePrintText = async () => {
        await instance.get('/api/send-mail/').then(
            response => response.data.map(async (date) => {
                const email = date.email;
                await instance.post('/api/send-mail/spam', {editorHtml, email}).catch(err=>{console.log(err)});
                alert('Письма успешно отправлены!');
                window.location.reload();
            })
        )
    };
    return (
        <div className='px-20 sm:px-20 lg:px-96 lg:pb-20 lg:pt-10'>
            <div className='text-3xl font-bold mb-4 flex flex-col items-center'>
                Рассылка писем на почту
            </div>
            <ReactQuill theme="snow" modules={modules}
                formats={formats} value={editorHtml} onChange={handleEditorChange} />
            <button className="inline-flex w-full mt-4 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:w-auto" onClick={handlePrintText}>Разослать письма</button>
        </div>
    )
}