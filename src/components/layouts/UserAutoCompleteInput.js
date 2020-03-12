/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import todo from '../../apis/todo'
import clsx from 'clsx'
import RenderError from './RenderError'

import useDebounce from '../utils/useDebounce'
import { Popper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  hidden: { display: 'none' }
}))

export default function UserAutoCompleteInput({
  input,
  label,
  meta,
  ...props
}) {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const debounceInputValue = useDebounce(inputValue, 500)

  const CustomPopper = props => {
    const classes = useStyles()
    return (
      <Popper
        {...props}
        className={clsx(props.className, {
          [classes.hidden]: debounceInputValue.length <= 1
        })}
      />
    )
  }

  useEffect(() => {
    if (debounceInputValue.length > 1) {
      const getRemoteOptions = async () => {
        setLoading(true)
        try {
          const { data } = await todo.get(
            `/users/get-by-term/${debounceInputValue}`
          )
          setOptions(data)
          setLoading(false)
        } catch (error) {}
      }
      getRemoteOptions()
    }
  }, [debounceInputValue])

  useEffect(() => {
    const getRemoteOptions = async () => {
      setLoading(true)
      try {
        const { data } = await todo.get(`/users/get-by-term`)
        setOptions(data)
        setLoading(false)
      } catch (error) {}
    }
    getRemoteOptions()
  }, [])

  return (
    <div className={'field'}>
      <Autocomplete
        multiple
        value={input.value}
        onChange={(_, value) => input.onChange(value)}
        id="tags-outlined"
        options={options}
        getOptionLabel={option =>
          `${option.firstName} ${option.lastName} @${option.username}`
        }
        inputValue={inputValue}
        onInputChange={(_, value) => {
          setInputValue(value)
        }}
        noOptionsText={loading ? 'Loading...' : 'No options'}
        PopperComponent={CustomPopper}
        debug
        filterSelectedOptions
        renderInput={params => (
          <div className="field">
            <label className="label" htmlFor={label}>
              {label}
            </label>
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              placeholder="Select Users"
            />
          </div>
        )}
      />
      {RenderError(meta)}
    </div>
  )
}
