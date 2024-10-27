import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, GetProp, message, Upload, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RcFile } from 'antd/es/upload';
import { FileUploadType } from '@/types/employee';


interface Props {
    initialFile: any | null | undefined
    initialURL: string | null
    disabled: boolean
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function ProfilePicture(props: Props) {

    const { initialFile, initialURL, disabled } = props

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {

        if(initialFile) {

            setInitialImageFile(initialFile?.file?.originFileObj)

        } else if(initialURL) {

            setImageUrl(currUrl => `${process.env.NEXT_PUBLIC_API_BASE_URL}/${initialURL}` )

        }

    }, [])

    const setInitialImageFile = (file: File) => {
        getBase64(file as FileType, (url) => {
            setLoading(false);
            setImageUrl(url);
        })
    }

    
    
    const getBase64 = (img: FileType, callback: (url: string) => void) => {

        if(img) {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result as string));
            reader.readAsDataURL(img);
        }

    };

    const validateImage = (file: FileType) => {

        const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
        const validFileSize = 5 // 5mb
        const fileSizeInMB = file.size / 1024 / 1024

        // Start Validating
        const isImageTypeValid = validFileTypes.includes(file.type);
        const isValidFileSize = fileSizeInMB < validFileSize;

        // Display Error Message
        if(!isImageTypeValid) message.error('You can only upload JPG/PNG file!');
        if (!isValidFileSize) message.error('Image must smaller than 5MB!');
        

        return isImageTypeValid && isValidFileSize;
    }
    const beforeUpload = (file: FileType) => {
        return validateImage(file)
    };

    const handleChange: UploadProps['onChange'] = (info) => {

        getBase64(info.file.originFileObj as FileType, (url) => {
            setLoading(false);
            setImageUrl(url);
        });

    };


    return (     
        <Form.Item
            name="employee_image"
            label="Profile Picture"
            initialValue={initialFile}
            rules={[
                { 
                    required: !disabled,
                    message: "Profile Picture is required"
                },
            ]}
        >
            <Upload
                name="avatar"
                listType="picture"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                fileList={[]}
                disabled={disabled}
            >
                <Avatar
                    size={128}
                    icon={imageUrl ? null : <PlusOutlined />}
                    src={imageUrl}
                    style={{ marginBottom: 20 }}
                >
                    <Button icon={<LoadingOutlined />} loading={loading}>
                        {loading ? 'Uploading' : 'Upload'}
                    </Button>
                </Avatar>
            </Upload>
        </Form.Item> 
    

    )
}