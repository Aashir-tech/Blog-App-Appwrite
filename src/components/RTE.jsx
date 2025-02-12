
import React from 'react'
import { Editor } from '@tinymce/tinymce-react' // Importing the TinyMCE editor component.
import { Controller } from 'react-hook-form'    // Importing Controller from react-hook-form to manage form control.

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
       <div className='w-full'>  {/* Main container for the editor, styled to take full width. */}
            {/* Conditionally render a label if one is provided */}
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>} 

            {/* Using Controller from react-hook-form to integrate the TinyMCE editor into the form. 
                The Controller manages the editor as a controlled input with react-hook-form */}
            <Controller 
                name={name || "content"}        // Name for the field, with a default to "content".
                control={control}               // Control object from react-hook-form to handle state.

                /* Render prop to define how the editor should look and behave. This function receives 
                   the field object from react-hook-form, where we destructure 'onChange' to link 
                   the editor's changes to the form state. */
                render={({ field: { onChange } }) => (
                    <Editor 
                        apiKey='osldz3618u19jjch7mmpmz4ukfdlcvbj3xar8mpy52mmpkei'
                        initialValue={defaultValue}  // Set the initial content of the editor.
                        
                        /* Configuration for the TinyMCE editor, such as size, plugins, toolbar, and styling. */
                        init={{
                            height: 500,          // Set editor height to 500px.
                            menubar: true,        // Display the menu bar at the top of the editor.
                            
                            /* Add various plugins for additional editor functionality like media, tables, etc. */
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount",
                            ],
                            
                            /* Define toolbar options for quick access to formatting features. */
                            toolbar: 
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            
                            /* Styling for the editor content */
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        
                        /* onEditorChange is triggered every time the editor content changes.
                           onChange is provided by react-hook-form and updates the form state */
                        onEditorChange={onChange}
                    />
                )}
            />
       </div>
    )
}


// import React from 'react'
// import {Editor} from '@tinymce/tinymce-react'
// import { Controller } from 'react-hook-form'

// export default function RTE({name , control , label , defaultValue = ""}){
//     return (
//        <div className='w-full'>
//         {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

//         <Controller 
//             name={name || "content"}
//             control={control}
//             render={({field : {onchange}}) => (
//                 <Editor 
//                     apiKey='osldz3618u19jjch7mmpmz4ukfdlcvbj3xar8mpy52mmpkei'
//                     initialValue = {defaultValue}
//                     init = {{
//                         initialValue : defaultValue,
//                         height : 500,
//                         menubar : true,
//                         plugins :[
//                             "image",
//                             "advlist",
//                             "autolink",
//                             "lists",
//                             "link",
//                             "image",
//                             "charmap",
//                             "preview",
//                             "anchor",
//                             "searchreplace",
//                             "visualblocks",
//                             "code",
//                             "fullscreen",
//                             "insertdatetime",
//                             "media",
//                             "table",
//                             "code",
//                             "help",
//                             "wordcount",
//                             "anchor",
//                         ],
//                         toolbar : 
//                             "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
//                         content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        
//                     }}

//                     onEditorChange={onchange}

//                 />
//     )}
//         />

//        </div>
//     )
// }
