import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { Container, Label } from './chart.styles';

const formatTooltipValue = (value, name) => [value, name];
const formatTooltipLabel = label => `Week: ${label}`;

const Chart = ({ data, label }) => (
  <Container>
    <Label>{label}</Label>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width={30} />
        <Tooltip
          isAnimationActive={false}
          formatter={formatTooltipValue}
          labelFormatter={formatTooltipLabel}
        />
        <Line type="monotone" dataKey="value.hours" name="Effective hours" stroke="#8884d8" />
        <Line type="monotone" dataKey="value.commits" name="Commits" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  </Container>
);

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
};

export default Chart;
