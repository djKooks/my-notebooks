import * as React from 'react'

interface IProps {
  options: any
  value: string
  onChange: (target: string) => void
}

class Picker extends React.Component<IProps> {
  public render() {
    const { value, onChange, options } = this.props

    return (
      <span>
        <h1>{value}</h1>
        <select onChange={e => onChange(e.target.value)} value={value}>
          {options.map((option: string) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    )
  }
}

export default Picker
