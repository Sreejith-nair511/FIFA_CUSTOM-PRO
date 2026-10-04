'use client'

import { useForm } from 'react-hook-form'

export function AddRecordModal({ type, open, onClose }: { type: string; open: boolean; onClose: () => void }) {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    try {
      let endpoint = '/api/matches'
      if (type === 'transfer') endpoint = '/api/transfers'
      if (type === 'trophy') endpoint = '/api/trophies'
      if (type === 'award') endpoint = '/api/awards'
      if (type === 'season') endpoint = '/api/seasons'
      if (type === 'attribute') endpoint = '/api/attributes'

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        alert(`${type} added!`)
        onClose()
        reset()
        window.location.reload()
      } else {
        alert('Error saving')
      }
    } catch (err) {
      alert('Error: ' + err)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-white mb-6 capitalize">Add {type}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
          {type === 'match' && (
            <>
              <input {...register('career_id', { required: true })} placeholder="Career ID *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('season_id', { required: true })} placeholder="Season ID *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('club_id', { required: true })} placeholder="Club ID *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('competition_id', { required: true })} placeholder="Competition ID *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('date', { required: true })} type="datetime-local" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('opponent', { required: true })} placeholder="Opponent *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <select {...register('home_away', { required: true })} className="w-full p-2 bg-gray-800 text-white rounded">
                <option value="">Home/Away *</option>
                <option value="home">Home</option>
                <option value="away">Away</option>
              </select>
              <input {...register('player_team_score', { required: true })} type="number" placeholder="Your Score *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('opponent_score', { required: true })} type="number" placeholder="Opponent Score *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <select {...register('result', { required: true })} className="w-full p-2 bg-gray-800 text-white rounded">
                <option value="">Result *</option>
                <option value="win">Win</option>
                <option value="draw">Draw</option>
                <option value="loss">Loss</option>
              </select>
              <input {...register('player_rating', { required: true })} type="number" step="0.1" placeholder="Rating 0-10 *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('goals', { required: true })} type="number" placeholder="Goals *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('assists', { required: true })} type="number" placeholder="Assists *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('minutes_played', { required: true })} type="number" placeholder="Minutes *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('match_image_url')} placeholder="Image URL" className="w-full p-2 bg-gray-800 text-white rounded" />
            </>
          )}
          {type === 'transfer' && (
            <>
              <input {...register('career_id', { required: true })} placeholder="Career ID *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('player_id', { required: true })} placeholder="Player ID *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('from_club_id')} placeholder="From Club ID" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('to_club_id', { required: true })} placeholder="To Club ID *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('transfer_date', { required: true })} type="datetime-local" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('transfer_fee')} type="number" placeholder="Transfer Fee" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('transfer_image_url')} placeholder="Image URL" className="w-full p-2 bg-gray-800 text-white rounded" />
            </>
          )}
          {type === 'trophy' && (
            <>
              <input {...register('career_id', { required: true })} placeholder="Career ID *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('competition_id', { required: true })} placeholder="Competition ID *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('club_id', { required: true })} placeholder="Club ID *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('date')} type="datetime-local" placeholder="Date" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('trophy_image_url')} placeholder="Image URL" className="w-full p-2 bg-gray-800 text-white rounded" />
            </>
          )}
          {type === 'award' && (
            <>
              <input {...register('career_id', { required: true })} placeholder="Career ID *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('name', { required: true })} placeholder="Award Name *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('category', { required: true })} placeholder="Category *" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('date', { required: true })} type="datetime-local" className="w-full p-2 bg-gray-800 text-white rounded" />
              <input {...register('award_image_url')} placeholder="Image URL" className="w-full p-2 bg-gray-800 text-white rounded" />
            </>
          )}
          <div className="flex gap-2 pt-4">
            <button type="submit" className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 text-sm font-bold">
              Save
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 text-sm font-bold">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
