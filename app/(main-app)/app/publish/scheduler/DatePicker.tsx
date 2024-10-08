import React, { useState } from 'react';
import { DatePicker, Space, Button } from 'antd';
import type { DatePickerProps, GetProps } from 'antd';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const PickDate: React.FC = (props : any) => {
  
    const {open,setOpen} = props
  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
  }

  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        open={open}
        showTime
        onChange={(value, dateString) => {
          console.log('Selected Time: ', value);
          console.log('Formatted Selected Time: ', dateString);
        }}
        onOk={onOk}
        onOpenChange={(status) => {
          setOpen(status); // Set open state when DatePicker's internal open/close happens
        }}
      />
    </Space>
  );
};

export default PickDate;
