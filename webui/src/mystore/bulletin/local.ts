import { defineStore } from 'pinia'
import { API, TokenVolumn, GetOneDayVolumnResponse } from './types'
import { doActionWithError } from '../action'
import { NotifyType } from '../notification'

export const useBulletinStore = defineStore('useBulletinStore', {
  state: () => ({
    TokenVolumns: [] as TokenVolumn[]
  }),
  actions: {
    getOneDayVolumn (done?: (error: boolean, rows: TokenVolumn[]) => void) {
      doActionWithError<unknown, GetOneDayVolumnResponse>(
        API.GetOneDayVolumn,
        {},
        {
          Error: {
            Title: 'get one day volumn',
            Message: 'failed to get one day volumn',
            Description: 'please retry',
            Popup: true,
            Type: NotifyType.Error
          }
        },
        (resp: GetOneDayVolumnResponse): void => {
          this.TokenVolumns = resp.Infos
          done?.(false, resp.Infos)
        }, () => {
          done?.(true, [])
        }
      )
    }
  }
})
