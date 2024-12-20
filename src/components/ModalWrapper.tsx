import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import CloseIcon from '@/assets/icons/close.svg?react'

type ModalWrapperProps = {
  isOpen: boolean
  onClose?: () => void
  closeOnOutsideClick?: boolean
  closeOnEsc?: boolean
  children: React.ReactNode
  showCloseIcon?: boolean
  className?: string
}

const ModalWrapper = ({
  isOpen,
  onClose,
  closeOnOutsideClick = false,
  closeOnEsc = false,
  children,
  showCloseIcon,
  className,
}: ModalWrapperProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!closeOnOutsideClick) {
      return
    }
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose?.()
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, closeOnOutsideClick, onClose])

  useEffect(() => {
    // Disable page scroll
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (!closeOnEsc) {
      return
    }
    const escFunction = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }
    document.addEventListener('keydown', escFunction, false)
    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeOnEsc])

  return (
    <>
      {isOpen && (
        <div className={classNames('modal-wrapper', className)}>
          <div ref={modalRef}>
            {showCloseIcon && (
              <div className="flex flex-row-reverse">
                <button className="mb-2" onClick={onClose}>
                  <CloseIcon className="fill-white size-7" />
                </button>
              </div>
            )}
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default ModalWrapper
