import React, { useEffect } from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, Input, Space } from 'antd';

interface SubmitButtonProps {
  form: FormInstance;
  isLoading: boolean
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children, isLoading }) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {

    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(({errorFields}) => 
        {
            if(errorFields.length > 0 ) setSubmittable(curr => false)
            else setSubmittable(curr => true)
        }
    );
  }, [form, values]);

  return (
    <Button 
        type="primary" 
        htmlType="submit" 
        disabled={!submittable} 
        className='mt-4'
        loading={isLoading}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;